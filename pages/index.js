import React from 'react';
import { 
  Brain, Lightbulb, PlayCircle, CheckCircle, Clock, 
  ChevronRight, Users, BookOpen, Star
} from 'lucide-react';

const ModuleCard = ({ module, onSelect }) => {
  return (
    <div 
      style={{
        background: 'linear-gradient(169deg, rgba(31, 41, 55, 0.7) 0%, rgba(17, 24, 39, 0.8) 100%)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        border: '1px solid rgba(139, 92, 246, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(139, 92, 246, 0.1)';
        e.currentTarget.style.border = '1px solid rgba(139, 92, 246, 0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.border = '1px solid rgba(139, 92, 246, 0.1)';
      }}
    >
      {/* Header */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${module.color}20, ${module.color}05)`,
            padding: '12px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <module.icon size={24} color={module.color} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#fff',
              marginBottom: '4px'
            }}>
              {module.title}
            </h2>
            <p style={{
              color: 'rgba(156, 163, 175, 1)',
              fontSize: '14px'
            }}>
              {module.description}
            </p>
          </div>
        </div>
        
        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '16px',
          padding: '12px',
          background: 'rgba(31, 41, 55, 0.4)',
          borderRadius: '12px'
        }}>
          {[
            { icon: Clock, label: `${module.modules.length * 30} min` },
            { icon: BookOpen, label: `${module.modules.length} módulos` },
            { icon: Users, label: '2.4k estudiantes' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(156, 163, 175, 1)',
              fontSize: '13px'
            }}>
              <stat.icon size={14} />
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modules List */}
      <div style={{ padding: '16px' }}>
        {module.modules.map((subModule, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(subModule)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              textAlign: 'left',
              padding: '16px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              marginBottom: idx !== module.modules.length - 1 ? '8px' : 0
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'none';
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <StatusIcon status={subModule.status} />
                <span style={{ color: '#fff', fontSize: '15px' }}>
                  {subModule.title}
                </span>
              </div>
              <ChevronRight size={16} color="rgba(156, 163, 175, 1)" />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              color: 'rgba(156, 163, 175, 1)',
              fontSize: '13px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} />
                <span>{subModule.duration} min</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} />
                <span>{subModule.content.length} conceptos</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const StatusIcon = ({ status }) => {
  const statusConfig = {
    completed: { 
      icon: CheckCircle, 
      color: '#34D399',
      background: 'rgba(52, 211, 153, 0.1)',
      text: 'Completado' 
    },
    inProgress: { 
      icon: PlayCircle, 
      color: '#60A5FA',
      background: 'rgba(96, 165, 250, 0.1)',
      text: 'En progreso' 
    },
    pending: { 
      icon: Clock, 
      color: '#9CA3AF',
      background: 'rgba(156, 163, 175, 0.1)',
      text: 'Pendiente' 
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 10px',
      background: config.background,
      borderRadius: '20px',
      color: config.color,
      fontSize: '12px'
    }}>
      <Icon size={14} />
      <span>{config.text}</span>
    </div>
  );
};

// Ejemplo de uso
export default function ModulesList() {
  const modules = {
    designThinking: {
      id: 'dt',
      title: 'Design Thinking',
      description: 'Metodología centrada en el usuario',
      icon: Brain,
      color: '#8B5CF6',
      modules: [
        {
          id: 'empathy',
          title: 'Empatizar con usuarios',
          duration: 45,
          status: 'completed',
          content: ['Entrevistas', 'Observación', 'Inmersión']
        },
        {
          id: 'define',
          title: 'Definir el problema',
          duration: 30,
          status: 'inProgress',
          content: ['POV', 'How Might We', 'Insights']
        }
      ]
    },
    ideation: {
      id: 'id',
      title: 'Técnicas de Ideación',
      description: 'Métodos para generar ideas innovadoras',
      icon: Lightbulb,
      color: '#EC4899',
      modules: [
        {
          id: 'brainstorming',
          title: 'Brainstorming Avanzado',
          duration: 40,
          status: 'pending',
          content: ['Reglas', 'Facilitación', 'Clustering']
        },
        {
          id: 'scamper',
          title: 'Método SCAMPER',
          duration: 35,
          status: 'pending',
          content: ['Sustituir', 'Combinar', 'Adaptar']
        }
      ]
    }
  };

  return (
    <div style={{
      padding: '24px',
      background: '#111827',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        display: 'grid',
        gap: '24px'
      }}>
        {Object.values(modules).map(module => (
          <ModuleCard 
            key={module.id} 
            module={module}
            onSelect={(subModule) => console.log('Selected:', subModule)}
          />
        ))}
      </div>
    </div>
  );
}