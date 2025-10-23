import React from 'react';
import styles from './styles.module.css';

interface InteractiveAPIProps {
  title?: string;
  description?: string;
}

export default function InteractiveAPI({
  title = 'Interactive API Documentation',
  description = 'Explore and test the Clearshore API endpoints'
}: InteractiveAPIProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      
      <div className={styles.iframeContainer}>
        <iframe
          src="/api/interactive"
          width="100%"
          height="800px"
          frameBorder="0"
          className={styles.iframe}
          title="Interactive API Documentation"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
      
      <div className={styles.footer}>
        <p className={styles.note}>
          💡 <strong>Tip:</strong> Use the "Authorize" button to add your API key and test endpoints directly!
        </p>
      </div>
    </div>
  );
}
