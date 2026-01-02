import { useState } from 'react';
import { Send, CheckCircle2, Calendar, Upload, FileText, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../utils/supabase';
import ScrollIndicator from '../components/ScrollIndicator';

export default function Apply() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredTime: '',
    message: '',
    gdprConsent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      let resumeUrl = '';

      if (resumeFile) {
        setUploadingResume(true);
        const fileExt = resumeFile.name.split('.').pop();
        const fileName = `${Date.now()}_${formData.firstName}_${formData.lastName}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, resumeFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Failed to upload resume: ${uploadError.message}`);
        }

        const { data: urlData } = supabase.storage
          .from('resumes')
          .getPublicUrl(filePath);

        resumeUrl = urlData.publicUrl;
        setUploadingResume(false);
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          preferredTime: formData.preferredTime,
          message: formData.message,
          resumeUrl: resumeUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit application');
      }

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          preferredTime: '',
          message: '',
          gdprConsent: false,
        });
        setResumeFile(null);
      }, 5000);
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
      setUploadingResume(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError(t('apply.form.error'));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError(t('apply.form.error'));
        return;
      }
      setResumeFile(file);
      setError(null);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <ScrollIndicator sectionCount={2} />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black" />
        <div className="absolute inset-0 radial-gradient" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 animate-fade-in-up">
              {t('apply.title')}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('apply.description')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-black to-neutral-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="glass-card p-12 text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-green-500" size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4">{t('apply.form.success')}</h2>
                <p className="text-lg text-gray-300">
                  {t('apply.form.successMessage')} {formData.email}.
                </p>
              </div>
            ) : (
              <div className="glass-card p-8 md:p-12">
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                        {t('apply.form.firstName')} *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-white"
                        placeholder={t('apply.form.firstNamePlaceholder')}
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                        {t('apply.form.lastName')} *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-white"
                        placeholder={t('apply.form.lastNamePlaceholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('apply.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-white"
                      placeholder={t('apply.form.emailPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('apply.form.phone')} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-white"
                      placeholder={t('apply.form.phonePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('apply.form.preferredTime')}
                    </label>
                    <input
                      type="text"
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-white"
                      placeholder={t('apply.form.preferredTimePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('apply.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-white resize-none"
                      placeholder={t('apply.form.messagePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('apply.form.resume')}
                    </label>
                    {!resumeFile ? (
                      <label
                        htmlFor="resume"
                        className="w-full px-4 py-8 bg-black/50 border-2 border-dashed border-white/10 rounded-lg hover:border-red-500/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
                      >
                        <Upload className="text-gray-400 group-hover:text-red-500 transition-colors" size={32} />
                        <span className="text-gray-400 group-hover:text-red-500 transition-colors">
                          {t('apply.form.uploadResume')}
                        </span>
                        <span className="text-xs text-gray-500">{t('apply.form.uploadInfo')}</span>
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          accept="application/pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="w-full px-4 py-4 bg-black/50 border border-white/10 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="text-red-500" size={24} />
                          <div>
                            <p className="text-white font-medium">{resumeFile.name}</p>
                            <p className="text-xs text-gray-400">
                              {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <X className="text-red-500" size={20} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="gdprConsent"
                      name="gdprConsent"
                      required
                      checked={formData.gdprConsent}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 bg-black/50 border border-white/10 rounded focus:ring-2 focus:ring-red-500/20 text-red-500"
                    />
                    <label htmlFor="gdprConsent" className="text-sm text-gray-400">
                      {t('apply.form.gdprConsent')} *
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || uploadingResume}
                    className="w-full px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingResume ? t('apply.form.uploadingResume') : submitting ? t('apply.form.submitting') : t('apply.form.submit')}
                    <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-start gap-3 text-gray-400 text-sm">
                    <Calendar className="text-red-500 flex-shrink-0 mt-1" size={20} />
                    <p>
                      {t('apply.contact.prefer')}{' '}
                      <a href="mailto:office@win-win.si" className="text-red-500 hover:underline">
                        office@win-win.si
                      </a>{' '}
                      {t('apply.contact.or')}{' '}
                      <a href="tel:+386XXXXXXXX" className="text-red-500 hover:underline">
                        +386 XX XXX XXX
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              {t('apply.process.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-red-500 mb-2">1</div>
                <h3 className="text-lg font-semibold mb-2">{t('apply.process.step1.title')}</h3>
                <p className="text-gray-400 text-sm">{t('apply.process.step1.desc')}</p>
              </div>

              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-red-500 mb-2">2</div>
                <h3 className="text-lg font-semibold mb-2">{t('apply.process.step2.title')}</h3>
                <p className="text-gray-400 text-sm">{t('apply.process.step2.desc')}</p>
              </div>

              <div className="glass-card p-6">
                <div className="text-4xl font-bold text-red-500 mb-2">3</div>
                <h3 className="text-lg font-semibold mb-2">{t('apply.process.step3.title')}</h3>
                <p className="text-gray-400 text-sm">{t('apply.process.step3.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
