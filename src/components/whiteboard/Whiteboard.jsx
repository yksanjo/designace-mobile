import { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Trash2, Copy, Download, Maximize2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';
import styles from './Whiteboard.module.css';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    primaryColor: '#E94560',
    primaryTextColor: '#FFFFFF',
    primaryBorderColor: '#00D9FF',
    lineColor: '#00D9FF',
    secondaryColor: '#0F3460',
    tertiaryColor: '#1A1A2E',
    background: '#0D0D0D',
    mainBkg: '#1A1A2E',
    nodeBorder: '#00D9FF',
    clusterBkg: '#16213E',
    edgeLabelBackground: '#1A1A2E',
  },
});

const TEMPLATES = {
  loadBalancer: `graph TD
    Client --> LB[Load Balancer]
    LB --> S1[Server 1]
    LB --> S2[Server 2]
    LB --> S3[Server 3]
    S1 --> DB[(Database)]
    S2 --> DB
    S3 --> DB`,
  
  microservices: `graph TD
    Client --> GW[API Gateway]
    GW --> Auth[Auth Service]
    GW --> User[User Service]
    GW --> Order[Order Service]
    GW --> Notif[Notification Service]
    Order --> MQ{Message Queue}
    MQ --> Notif
    Order --> DB1[(Order DB)]
    User --> DB2[(User DB)]`,
  
  cache: `graph LR
    Client --> API[API Server]
    API --> Cache[(Redis Cache)]
    Cache -.->|miss| DB[(Database)]
    Cache == hit ==> API`,
  
  cdn: `graph TD
    User -->|request| CDN[CDN Edge]
    CDN -->|cache hit| Response
    CDN -->|cache miss| Origin[Origin Server]
    Origin --> Response`,
  
  database: `graph TD
    App[Application] -->|read/write| LB[Load Balancer]
    LB --> Primary[(Primary DB)]
    Primary -.->|replicate| Replica1[(Replica 1)]
    Primary -.->|replicate| Replica2[(Replica 2)]`,
};

export default function Whiteboard() {
  const { state, dispatch } = useApp();
  const [code, setCode] = useState(TEMPLATES.loadBalancer);
  const [renderedSvg, setRenderedSvg] = useState('');
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const renderTimeoutRef = useRef(null);

  useEffect(() => {
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current);
    }
    
    renderTimeoutRef.current = setTimeout(() => {
      renderDiagram();
    }, 500);
    
    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current);
      }
    };
  }, [code]);

  useEffect(() => {
    if (state.currentSession?.diagram) {
      setCode(state.currentSession.diagram);
    }
  }, [state.currentSession]);

  const renderDiagram = async () => {
    try {
      setError('');
      const id = `mermaid-${Date.now()}`;
      const { svg } = await mermaid.render(id, code);
      setRenderedSvg(svg);
      
      // Save to session
      if (state.currentSession) {
        dispatch({ type: 'UPDATE_DIAGRAM', payload: code });
      }
    } catch (err) {
      setError('Invalid diagram syntax. Check your Mermaid code.');
      console.error('Mermaid error:', err);
    }
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const clearDiagram = () => {
    setCode('');
    setRenderedSvg('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const exportSvg = () => {
    const blob = new Blob([renderedSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadTemplate = (templateKey) => {
    setCode(TEMPLATES[templateKey]);
  };

  return (
    <div className={styles.whiteboard}>
      <div className={styles.toolbar}>
        <div className={styles.templates}>
          <span className={styles.templatesLabel}>Templates:</span>
          {Object.keys(TEMPLATES).map((key) => (
            <button
              key={key}
              className={styles.templateBtn}
              onClick={() => loadTemplate(key)}
            >
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>
        <div className={styles.actions}>
          <button className={styles.iconBtn} onClick={copyCode} title="Copy code">
            <Copy size={16} />
          </button>
          <button className={styles.iconBtn} onClick={exportSvg} title="Export SVG">
            <Download size={16} />
          </button>
          <button className={styles.iconBtn} onClick={clearDiagram} title="Clear">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.editor}>
          <div className={styles.editorHeader}>
            <span>Mermaid Code</span>
          </div>
          <textarea
            className={styles.codeInput}
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter Mermaid diagram code..."
            spellCheck={false}
          />
        </div>
        
        <div className={styles.preview}>
          <div className={styles.previewHeader}>
            <span>Preview</span>
          </div>
          <div 
            className={styles.previewContent}
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: renderedSvg }}
          />
          {error && <div className={styles.error}>{error}</div>}
          {!code && !renderedSvg && (
            <div className={styles.placeholder}>
              Select a template or write your own Mermaid diagram
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
