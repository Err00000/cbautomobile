import React, { useState, useContext } from 'react';
import { LanguageContext } from '../App';
import { CONTENT } from '../constants';
import * as Icons from 'lucide-react';

const EmailSubscriptionForm: React.FC = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    return null;
  }
  const { language } = context;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const newsletterContent = CONTENT.newsletter;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/api/subscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage(newsletterContent.successMessage[language]);
        setIsSuccess(true);
        setEmail('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.email ? errorData.email[0] : newsletterContent.failureMessage[language]);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage(newsletterContent.errorMessage[language]);
      setIsSuccess(false);
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 -mt-20 -ml-20 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{newsletterContent.title[language]}</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto mb-8">{newsletterContent.subtitle[language]}</p>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                <div className="relative flex-grow">
                    <Icons.Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <input
                        type="email"
                        id="email"
                        className="w-full h-14 pl-12 pr-4 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                        placeholder={newsletterContent.emailPlaceholder[language]}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <button
                    type="submit"
                    className="flex-shrink-0 h-14 px-8 bg-yellow-600 text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Icons.Loader className="animate-spin w-5 h-5" />
                            {newsletterContent.subscribingButton[language]}
                        </>
                    ) : (
                        <>
                            {newsletterContent.subscribeButton[language]}
                            <Icons.Send className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>
            {message && (
                <p className={`mt-4 text-center text-sm ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
                    {message}
                </p>
            )}
        </div>
    </div>
  );
};

export default EmailSubscriptionForm;
