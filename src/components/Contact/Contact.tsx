import styles from './Contact.module.css';
import { useState } from 'react';

const Contact = () => {
  // 👇 MIEJSCE NA LOGIKĘ: Integracja z EmailJS
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      // Użyj jednej z opcji:
      
      // 1. EmailJS (zainstaluj: npm install @emailjs/browser)
      // import emailjs from '@emailjs/browser';
      // await emailjs.sendForm(
      //   'service_id', 
      //   'template_id', 
      //   form, 
      //   'public_key'
      // );

      // 2. Formspree (darmowe, bez instalacji)
      // const response = await fetch('https://formspree.io/f/your_form_id', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // 3. Web3Forms (alternatywa dla Formspree)
      // const response = await fetch('https://api.web3forms.com/submit', {
      //   method: 'POST',
      //   body: formData,
      // });

      // Symulacja
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      form.reset();
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Contact Me</h2>
        
        <div className={styles.contactContent}>
          <p className={styles.contactText}>
            Have a project in mind? Let's work together!
          </p>
          
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
              className={styles.input}
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required 
              className={styles.input}
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              rows={5} 
              required
              className={styles.textarea}
            />
            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
            
            {status === 'success' && (
              <p className={styles.success}>✅ Message sent! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className={styles.error}>❌ Something went wrong. Please try again or email me directly.</p>
            )}
          </form>
          
          <div className={styles.directContact}>
            <span>Or contact me directly: </span>
            <a href="mailto:adam@example.com">adam@example.com</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;