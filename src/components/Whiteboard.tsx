import { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, Code, Layout, RefreshCw, Download } from 'lucide-react';
import mermaid from 'mermaid';
import { diagramTemplates } from '../data/questions';
import { cn } from '../lib/utils';

interface WhiteboardProps {
  diagram?: string;
  onDiagramChange: (diagram: string) => void;
}

export function Whiteboard({ diagram, onDiagramChange }: WhiteboardProps) {
  const [mermaidCode, setMermaidCode] = useState(diagram || diagramTemplates[0].mermaidCode);
  const [view, setView] = useState<'preview' | 'code'>('preview');
  const [zoom, setZoom] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(diagramTemplates[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#58a6ff',
        primaryTextColor: '#f0f6fc',
        primaryBorderColor: '#30363d',
        lineColor: '#8b949e',
        secondaryColor: '#21262d',
        tertiaryColor: '#161b22',
        background: '#0d1117',
        mainBkg: '#161b22',
        nodeBorder: '#30363d',
        clusterBkg: '#21262d',
        clusterBorder: '#30363d',
        titleColor: '#f0f6fc',
        edgeLabelBackground: '#161b22'
      }
    });
  }, []);

  useEffect(() => {
    if (view === 'preview' && mermaidCode) {
      renderDiagram();
    }
  }, [mermaidCode, view]);

  const renderDiagram = async () => {
    if (!containerRef.current) return;
    
    try {
      const id = `mermaid-${Date.now()}`;
      const { svg } = await mermaid.render(id, mermaidCode);
      containerRef.current.innerHTML = svg;
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      containerRef.current.innerHTML = `<p class="text-accent-error text-sm">Invalid diagram syntax</p>`;
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = diagramTemplates.find(t => t.id === templateId);
    if (template) {
      setMermaidCode(template.mermaidCode);
      setSelectedTemplate(templateId);
      onDiagramChange(template.mermaidCode);
    }
  };

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.1, 0.5));

  const handleExport = () => {
    const svg = containerRef.current?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'diagram.svg';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="h-full flex flex-col bg-bg-secondary">
      {/* Toolbar */}
      <div className="h-12 border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center bg-bg-tertiary rounded-lg p-1">
            <button
              onClick={() => setView('preview')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors',
                view === 'preview' ? 'bg-accent-primary text-white' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              <Layout className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={() => setView('code')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors',
                view === 'code' ? 'bg-accent-primary text-white' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              <Code className="w-4 h-4" />
              Code
            </button>
          </div>

          {/* Templates */}
          {view === 'preview' && (
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateSelect(e.target.value)}
              className="bg-bg-tertiary border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent-primary"
            >
              {diagramTemplates.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          {view === 'preview' && (
            <>
              <button
                onClick={handleZoomOut}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs text-text-secondary w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </>
          )}

          {view === 'preview' && (
            <button
              onClick={handleExport}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={renderDiagram}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {view === 'preview' ? (
          <div 
            ref={containerRef}
            className="h-full flex items-center justify-center p-4"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          />
        ) : (
          <div className="h-full p-4">
            <textarea
              value={mermaidCode}
              onChange={(e) => {
                setMermaidCode(e.target.value);
                onDiagramChange(e.target.value);
              }}
              className="w-full h-full bg-bg-tertiary border border-border rounded-lg p-4 font-mono text-sm text-text-primary resize-none focus:outline-none focus:border-accent-primary"
              placeholder="Enter Mermaid diagram code..."
            />
          </div>
        )}
      </div>

      {/* Help */}
      {view === 'code' && (
        <div className="p-4 border-t border-border bg-bg-tertiary/50">
          <p className="text-xs text-text-secondary">
            Use Mermaid syntax. Examples: 
            <code className="mx-1 px-1 bg-bg-tertiary rounded">graph LR</code>
            <code className="mx-1 px-1 bg-bg-tertiary rounded">sequenceDiagram</code>
            <code className="mx-1 px-1 bg-bg-tertiary rounded">classDiagram</code>
          </p>
        </div>
      )}
    </div>
  );
}
