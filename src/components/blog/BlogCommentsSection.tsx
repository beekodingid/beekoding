import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  type BlogComment,
  getCommentsForArticle,
  addComment,
  toggleCommentLike,
  fetchCommentsFromCloud,
  generateWhatsAppCommentForwardUrl,
} from '../../services/blogCommentsStorage';
import { onStorageUpdate } from '../../services/adminStorage';
import {
  MessageSquare,
  Send,
  Heart,
  CornerDownRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  User,
  MessageCircle,
} from 'lucide-react';

interface BlogCommentsSectionProps {
  articleSlug: string;
  articleTitle: string;
}

export const BlogCommentsSection: React.FC<BlogCommentsSectionProps> = ({
  articleSlug,
  articleTitle,
}) => {
  const { isDark } = useTheme();

  const [comments, setComments] = useState<BlogComment[]>(() =>
    getCommentsForArticle(articleSlug)
  );
  const [likedCommentIds, setLikedCommentIds] = useState<Set<string>>(new Set());

  // Form State (Top-level)
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessNotice, setShowSuccessNotice] = useState(false);
  const [lastSubmittedComment, setLastSubmittedComment] = useState<BlogComment | null>(null);

  // Reply State (Nested)
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyAuthorName, setReplyAuthorName] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Sync data on storage update & cloud fetch
  useEffect(() => {
    setComments(getCommentsForArticle(articleSlug));

    fetchCommentsFromCloud().then((cloudComments) => {
      if (cloudComments) {
        setComments(cloudComments.filter((c) => c.articleSlug === articleSlug && c.status === 'approved'));
      }
    });

    const unsubscribe = onStorageUpdate((type) => {
      if (type === 'blog' || type === 'all') {
        setComments(getCommentsForArticle(articleSlug));
      }
    });

    return () => unsubscribe();
  }, [articleSlug]);

  const handleSubmitTopLevel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const created = await addComment({
        articleSlug,
        authorName: authorName.trim(),
        content: content.trim(),
      });

      setContent('');
      setLastSubmittedComment(created);
      setComments(getCommentsForArticle(articleSlug));
      setShowSuccessNotice(true);
      setTimeout(() => setShowSuccessNotice(false), 8000);
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyAuthorName.trim() || !replyContent.trim()) return;

    setIsSubmittingReply(true);
    try {
      await addComment({
        articleSlug,
        authorName: replyAuthorName.trim(),
        content: replyContent.trim(),
        parentId,
      });

      setReplyContent('');
      setReplyingToId(null);
      setComments(getCommentsForArticle(articleSlug));
    } catch (err) {
      console.error('Error submitting reply:', err);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleLike = (commentId: string) => {
    if (likedCommentIds.has(commentId)) return;
    toggleCommentLike(commentId);
    setLikedCommentIds((prev) => new Set([...prev, commentId]));
    setComments(getCommentsForArticle(articleSlug));
  };

  // Format relative or friendly date
  const formatTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Hari ini';
    if (days === 1) return 'Kemarin';
    if (days < 30) return `${days} hari lalu`;
    const months = Math.floor(days / 30);
    return `${months} bulan lalu`;
  };

  // Separate parent comments and replies
  const parentComments = comments.filter((c) => !c.parentId);
  const repliesMap: Record<string, BlogComment[]> = {};
  for (const c of comments) {
    if (c.parentId) {
      if (!repliesMap[c.parentId]) {
        repliesMap[c.parentId] = [];
      }
      repliesMap[c.parentId].push(c);
    }
  }

  return (
    <section
      aria-label="Diskusi dan Komentar Artikel"
      className="pt-10 border-t border-amber-500/20 space-y-8 animate-fadeIn"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              <span>Diskusi & Tanya Jawab</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400">
              {comments.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Punya pertanyaan seputar materi koding ini? Tanyakan langsung, mentor kami akan menjawab.
          </p>
        </div>
      </div>

      {/* Main Comment Form */}
      <form
        onSubmit={handleSubmitTopLevel}
        className={`p-5 sm:p-6 rounded-3xl border-2 transition-all space-y-4 ${
          isDark
            ? 'bg-[#121622]/90 border-amber-500/25 shadow-lg shadow-black/20'
            : 'bg-white border-amber-200/90 shadow-md shadow-amber-950/5'
        }`}
      >
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Tulis Tanggapan atau Pertanyaan</span>
        </div>

        {showSuccessNotice && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Pertanyaan Anda berhasil dikirim & diteruskan ke antrean Mentor!</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Butuh jawaban lebih cepat? Anda dapat meneruskan pertanyaan ini langsung ke WhatsApp Hotline Beekoding.
              </p>
            </div>
            {lastSubmittedComment && (
              <a
                href={generateWhatsAppCommentForwardUrl(lastSubmittedComment)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Tanya via WhatsApp</span>
              </a>
            )}
          </div>
        )}

        <div className="grid sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5">
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Nama Anda
            </label>
            <input
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Contoh: Ayah Budi / Bunda Maya"
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-400'
                  : 'bg-slate-50 border-amber-200 text-slate-900 focus:border-amber-500'
              }`}
            />
          </div>

          <div className="sm:col-span-7">
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Topik Diskusi
            </label>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate pt-2">
              Artikel: <span className="font-semibold text-slate-700 dark:text-slate-200">{articleTitle}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
            Isi Pertanyaan / Komentar
          </label>
          <textarea
            required
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tuliskan pengalaman ananda, keraguan kurikulum, atau pertanyaan seputar materi..."
            className={`w-full p-3.5 rounded-2xl text-xs sm:text-sm border outline-none transition-all resize-y ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-400'
                : 'bg-slate-50 border-amber-200 text-slate-900 focus:border-amber-500'
            }`}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Komentar dimoderasi demi kenyamanan bersama. Ramah anak & keluarga.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Tanggapan'}</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {parentComments.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-3xl border border-dashed border-amber-500/30 text-slate-500 dark:text-slate-400 space-y-2">
            <MessageSquare className="w-8 h-8 text-amber-500/50 mx-auto" />
            <p className="text-sm font-bold">Belum ada diskusi untuk artikel ini.</p>
            <p className="text-xs text-slate-400">
              Jadilah yang pertama mengajukan pertanyaan atau berbagi pengalaman belajar ananda!
            </p>
          </div>
        ) : (
          parentComments.map((comment) => {
            const replies = repliesMap[comment.id] || [];
            const isLiked = likedCommentIds.has(comment.id);

            return (
              <div
                key={comment.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
                  isDark
                    ? 'bg-[#121622]/80 border-slate-800'
                    : 'bg-white border-amber-200/70 shadow-xs'
                }`}
              >
                {/* Author Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                        comment.isMentor
                          ? 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 ring-2 ring-amber-400/50'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {comment.isMentor ? '🐝' : <User className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {comment.authorName}
                        </span>
                        {comment.isMentor && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            Mentor Resmi
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span>{comment.authorRole}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{formatTimeAgo(comment.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Like Button */}
                  <button
                    type="button"
                    onClick={() => handleLike(comment.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      isLiked
                        ? 'bg-rose-500/15 border-rose-500/30 text-rose-500'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-500'
                    }`}
                    title="Bermanfaat / Suka"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                    <span>{comment.likesCount}</span>
                  </button>
                </div>

                {/* Comment Content */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-10 sm:pl-10.5">
                  {comment.content}
                </p>

                {/* Action Trigger Buttons */}
                <div className="pl-10 sm:pl-10.5 pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setReplyingToId(replyingToId === comment.id ? null : comment.id)
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    <CornerDownRight className="w-3 h-3" />
                    <span>{replyingToId === comment.id ? 'Batal Balas' : 'Balas Diskusi'}</span>
                  </button>

                  <a
                    href={generateWhatsAppCommentForwardUrl(comment)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    title="Konsultasikan pertanyaan ini langsung ke Mentor via WhatsApp"
                  >
                    <MessageCircle className="w-3 h-3 text-emerald-500" />
                    <span>Tanya via WhatsApp</span>
                  </a>
                </div>

                {/* Reply Form (If active) */}
                {replyingToId === comment.id && (
                  <form
                    onSubmit={(e) => handleSubmitReply(e, comment.id)}
                    className="mt-3 ml-6 sm:ml-10 p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2.5 animate-fadeIn"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        required
                        value={replyAuthorName}
                        onChange={(e) => setReplyAuthorName(e.target.value)}
                        placeholder="Nama Anda..."
                        className={`w-48 px-2.5 py-1.5 rounded-lg text-xs border outline-none ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-white'
                            : 'bg-white border-amber-200 text-slate-900'
                        }`}
                      />
                    </div>
                    <textarea
                      required
                      rows={2}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={`Balas ${comment.authorName}...`}
                      className={`w-full p-2.5 rounded-xl text-xs border outline-none resize-none ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-white border-amber-200 text-slate-900'
                      }`}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setReplyingToId(null)}
                        className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-500"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingReply}
                        className="px-3.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-3 h-3" />
                        <span>Kirim Balasan</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Nested Replies (e.g. Mentor Answers) */}
                {replies.length > 0 && (
                  <div className="mt-3 space-y-2.5 pl-4 sm:pl-8 border-l-2 border-amber-500/30">
                    {replies.map((reply) => {
                      const isReplyLiked = likedCommentIds.has(reply.id);
                      return (
                        <div
                          key={reply.id}
                          className={`p-3 sm:p-3.5 rounded-xl border ${
                            reply.isMentor
                              ? isDark
                                ? 'bg-amber-500/10 border-amber-500/30 shadow-xs'
                                : 'bg-amber-50/90 border-amber-200/90'
                              : isDark
                              ? 'bg-slate-900/60 border-slate-800'
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-white">
                                {reply.authorName}
                              </span>
                              {reply.isMentor && (
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-xs">
                                  🐝 Mentor Beekoding
                                </span>
                              )}
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                • {formatTimeAgo(reply.createdAt)}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleLike(reply.id)}
                              className={`inline-flex items-center gap-1 text-[11px] ${
                                isReplyLiked ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-rose-500'
                              }`}
                            >
                              <Heart className={`w-3 h-3 ${isReplyLiked ? 'fill-rose-500' : ''}`} />
                              <span>{reply.likesCount}</span>
                            </button>
                          </div>

                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            {reply.content}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
