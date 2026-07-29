import React from 'react';

const deviconMap: Record<string, { icon: string; color: string }> = {
  frontend: { icon: 'devicon-react-original', color: '#61dafb' },
  backend: { icon: 'devicon-nodejs-plain', color: '#68a063' },
  database: { icon: 'devicon-postgresql-plain', color: '#336791' },
  devops: { icon: 'devicon-docker-plain', color: '#2496ed' },
  security: { icon: 'devicon-linux-plain', color: '#f5a623' },
  ai: { icon: 'devicon-python-plain', color: '#3572a5' },
  mobile: { icon: 'devicon-flutter-plain', color: '#54c5f8' },
  fullstack: { icon: 'devicon-javascript-plain', color: '#f7df1e' },
  cloud: { icon: 'devicon-amazonwebservices-plain', color: '#ff9900' },
  uxui: { icon: 'devicon-figma-plain', color: '#f24e1e' },
  game: { icon: 'devicon-godot-plain', color: '#478cbf' },
  systems: { icon: 'devicon-rust-plain', color: '#ce422b' },
};

export default function Avatar({ avatar, style, className }: { avatar: string; style?: React.CSSProperties; className?: string }) {
  if (!avatar) return null;
  const isDeviconId = /^[a-z]+$/.test(avatar);
  
  if (isDeviconId && deviconMap[avatar]) {
    const matched = deviconMap[avatar];
    return (
      <i
        className={`${matched.icon} colored ${className || ''}`}
        style={{
          fontSize: '1.2rem',
          filter: `drop-shadow(0 0 4px ${matched.color}60)`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style
        }}
      />
    );
  }
  
  return <span className={className} style={style}>{avatar}</span>;
}
