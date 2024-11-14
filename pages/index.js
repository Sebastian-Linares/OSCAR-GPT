import React, { useState, useEffect } from 'react';
import { 
  Sparkles, BookOpen, ArrowLeft, Send, MessageSquare, Clock, 
  Lightbulb, Rocket, Brain, Target, Palette, Zap, Hexagon,
  PlayCircle, CheckCircle, BookmarkPlus, Timer, TrendingUp,
  FileText, Download, Share2, Star, Coffee, Layout
} from 'lucide-react';

// Estilos base
const styles = {
  container: {
    backgroundColor: '#111827',
    minHeight: '100vh',
    padding: '24px',
    color: 'white',
  },
  card: {
    background: 'rgba(31, 41, 55, 0.5)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    borderRadius: '16px',
    padding: '20px',
  },
  button: {
    backgroundColor: '#8B5CF6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  gradientText: {
    background: 'linear-gradient(to right, #8B5CF6, #EC4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }
};

export default function CreativityDashboard() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeView, setActiveView] = useState('module');
  const [activeSession, setActiveSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Datos de la aplicación
  const modules = {
    design: {
      id: 'design',
      title: 'Design Thinking',
      description: 'Metodología centrada en el usuario',
      icon: Brain,
      color: '#8B5CF6',
      modules: [
        {
          id: 'empathy',
          title: 'Empatizar',
          duration: 45,
          status: 'pending',
          content: [
            'Entrevistas con usuarios',
            'Observación del contexto',
            'Inmersión en la experiencia',
          ],
          tools: [
            { name: 'Mapa de Empatía', icon: Layout },
            { name: 'Journey Map', icon: Target },
          ]
        },
        {
          id: 'define',
          title: 'Definir',
          duration: 30,
          status: 'inProgress',
          content: [
            'POV Statements',
            'How Might We',
            'Definición del problema',
          ],
          tools: [
            { name: 'Problem Statement', icon: Brain },
            { name: 'User Persona', icon: Target },
          ]
        }
      ]
    },
    ideation: {
      id: 'ideation',
      title: 'Técnicas de Ideación',
      description: 'Herramientas para generar ideas',
      icon: Lightbulb,
      color: '#EC4899',
      modules: [
        {
          id: 'brainstorming',
          title: 'Brainstorming',
          duration: 40,
          status: 'completed',
          content: [
            'Reglas del brainstorming',
            'Facilitación efectiva',
            'Categorización de ideas',
          ],
          tools: [
            { name: 'Mind Map', icon: Brain },
            { name: 'Crazy 8s', icon: Layout },
          ]
        },
        {
          id: 'scamper',
          title: 'SCAMPER',
          duration: 35,
          status: 'pending',
          content: [
            'Sustituir',
            'Combinar',
            'Adaptar',
            'Modificar',
          ],
          tools: [
            { name: 'SCAMPER Canvas', icon: Layout },
            { name: 'Ideation Matrix', icon: Target },
          ]
        }
      ]
    }
  };

  // Componentes de UI
  const Header = ({ title, showBack = false }) => (
    <div style={{...styles.card, marginBottom: '24px'}}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {showBack && (
          <button
            onClick={() => {
              setSelectedModule(null);
              setActiveSession(null);
            }}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
            borderRadius: '12px',
            padding: '10px',
          }}>
            <Sparkles size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {title || 'OSCAR GPT'}
            </h1>
            <p style={{ color: '#9CA3AF', marginTop: '4px' }}>
              Asistente de Creatividad e Innovación
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ModuleCard = ({ module }) => (
    <div style={styles.card}>
      <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
        <div style={{
          background: `linear-gradient(45deg, ${module.color}40, ${module.color}20)`,
          borderRadius: '12px',
          padding: '12px',
        }}>
          <module.icon size={24} color={module.color} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>{module.title}</h2>
          <p style={{ color: '#9CA3AF', marginBottom: '16px' }}>{module.description}</p>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {module.modules.map(subModule => (
              <button
                key={subModule.id}
                onClick={() => setActiveSession(subModule)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'rgba(31, 41, 55, 0.5)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: 'white' }}>{subModule.title}</span>
                  <span style={{ color: '#9CA3AF' }}>{subModule.duration} min</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {subModule.status === 'completed' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#34D399' }}>
                      <CheckCircle size={16} />
                      <span>Completado</span>
                    </div>
                  )}
                  {subModule.status === 'inProgress' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#60A5FA' }}>
                      <PlayCircle size={16} />
                      <span>En progreso</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Vista principal
  if (!activeSession) {
    return (
      <div style={styles.container}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Header />
          <div style={{ display: 'grid', gap: '24px' }}>
            {Object.values(modules).map(module => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Vista de sesión activa
  return (
    <div style={styles.container}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Header title={activeSession.title} showBack />
        
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>
          {/* Panel izquierdo - Contenido y Tools */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={styles.card}>
              <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Contenido</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeSession.content.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={16} color="#8B5CF6" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={styles.card}>
              <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Herramientas</h3>
              <div style={{ display: 'grid', gap: '8px' }}>
                {activeSession.tools.map((tool, idx) => (
                  <button
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px',
                      background: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    <tool.icon size={16} color="#8B5CF6" />
                    <span>{tool.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Panel derecho - Chat */}
          <div style={{...styles.card, display: 'flex', flexDirection: 'column', height: '600px'}}>
            <div style={{ 
              borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Brain size={20} color="#8B5CF6" />
              <span>AI Assistant</span>
            </div>

            <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: '12px'
                  }}
                >
                  <div style={{
                    maxWidth: '80%',
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: msg.type === 'user' ? '#8B5CF6' : 'rgba(139, 92, 246, 0.1)',
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ 
              borderTop: '1px solid rgba(139, 92, 246, 0.2)',
              padding: '16px',
              display: 'flex',
              gap: '12px'
            }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                style={{
                  flex: 1,
                  background: 'rgba(31, 41, 55, 0.5)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  borderRadius: '8px',
                  padding: '12px',
                  color: 'white'
                }}
              />
              <button style={styles.button}>
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}