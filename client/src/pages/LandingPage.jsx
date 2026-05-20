import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero" style={{
        textAlign: 'center',
        padding: 'var(--space-xxl) var(--space-md)',
        background: 'linear-gradient(135deg, #f9f9fb 0%, #e6e5ff 100%)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: 'var(--space-xl)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-md)', color: 'var(--text)' }}>
          Learn. Teach. <span style={{ color: 'var(--primary)' }}>Swap Skills.</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: 'var(--space-xl)', maxWidth: '600px', margin: '0 auto var(--space-xl)' }}>
          A platform for students to exchange knowledge. You teach me what you know, I'll teach you what I know. No money involved, just pure learning.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1.1rem' }}>Get Started</Link>
          <Link to="/browse" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1.1rem' }}>Browse Skills</Link>
        </div>
      </section>

      <section style={{ marginBottom: 'var(--space-xxl)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>How It Works</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-lg)'
        }}>
          {[
            { step: '1', title: 'Create a Profile', desc: 'Sign up and showcase who you are and what you study.' },
            { step: '2', title: 'List Your Skills', desc: 'Add skills you are confident in and willing to teach others.' },
            { step: '3', title: 'Send Swap Requests', desc: 'Find someone who wants to learn your skill and has a skill you want to learn.' }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'var(--card-bg)',
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-sm)',
              textAlign: 'center',
              border: '1px solid var(--border)'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '0 auto var(--space-md)'
              }}>{item.step}</div>
              <h3 style={{ marginBottom: 'var(--space-sm)' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
