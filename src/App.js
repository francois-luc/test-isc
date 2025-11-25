import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    theme: "Avant de solliciter l'IA",
    question: "Quand vous avez besoin de l'IA pour un travail de réflexion, vous...",
    friction: "Premier Jet Manuel",
    options: [
      { text: "Vous accordez d'abord quelques minutes pour formuler votre propre pensée sur le sujet", score: 2 },
      { text: "Ouvrez l'IA directement en sachant à peu près ce que vous voulez", score: 1 },
      { text: "Ouvrez l'IA et vous laissez guider par ses propositions", score: 0 }
    ]
  },
  {
    id: 2,
    theme: "Rédaction",
    question: "Pour produire un texte important, vous...",
    friction: "Sparring Créatif",
    options: [
      { text: "Rédigez votre version d'abord, puis confrontez avec ce que l'IA proposerait", score: 2 },
      { text: "Co-rédigez avec l'IA dès le départ", score: 1 },
      { text: "Décrivez votre besoin et l'IA génère, vous ajustez ensuite", score: 0 }
    ]
  },
  {
    id: 3,
    theme: "Face à une suggestion",
    question: "Quand l'IA vous propose une formulation ou une idée, vous...",
    friction: "Pause Réflexive",
    options: [
      { text: "Marquez une pause pour évaluer avant d'accepter", score: 2 },
      { text: "Évaluez rapidement et acceptez si ça semble correct", score: 1 },
      { text: "Acceptez généralement car c'est souvent meilleur que ce que vous auriez fait", score: 0 }
    ]
  },
  {
    id: 4,
    theme: "Après utilisation",
    question: "Une fois le travail terminé avec l'IA, vous...",
    friction: "Défi de Reformulation",
    options: [
      { text: "Reformulez systématiquement dans vos propres mots", score: 2 },
      { text: "Ajustez le ton et quelques éléments", score: 1 },
      { text: "Gardez l'essentiel tel quel si c'est satisfaisant", score: 0 }
    ]
  },
  {
    id: 5,
    theme: "Décision d'utiliser l'IA",
    question: "Avant de recourir à l'IA pour une tâche, vous...",
    friction: "Règle des 3 Pourquoi",
    options: [
      { text: "Vous demandez explicitement si c'est vraiment nécessaire", score: 2 },
      { text: "Y allez naturellement si ça peut aider", score: 1 },
      { text: "C'est devenu un réflexe pour la plupart des tâches", score: 0 }
    ]
  },
  {
    id: 6,
    theme: "Vérification",
    question: "Face au résultat produit par l'IA, vous...",
    friction: "Mentor Inversé",
    options: [
      { text: "Cherchez activement ce qui pourrait être faux ou biaisé", score: 2 },
      { text: "Vérifiez si quelque chose vous semble suspect", score: 1 },
      { text: "Faites confiance si c'est cohérent et bien écrit", score: 0 }
    ]
  },
  {
    id: 7,
    theme: "Mémorisation",
    question: "Le lendemain d'un travail assisté par l'IA, vous...",
    friction: "Test du Lendemain",
    options: [
      { text: "Êtes capable de refaire ou réexpliquer sans l'IA", score: 2 },
      { text: "Vous souvenez des grandes lignes", score: 1 },
      { text: "Auriez besoin de rouvrir l'IA pour retrouver le fil", score: 0 }
    ]
  },
  {
    id: 8,
    theme: "Temps sans IA",
    question: "Dans votre semaine de travail intellectuel, vous...",
    friction: "Zone Sanctuaire",
    options: [
      { text: "Préservez des moments dédiés à la réflexion sans aucun outil IA", score: 2 },
      { text: "N'utilisez pas l'IA pour tout mais sans règle précise", score: 1 },
      { text: "L'IA est présente dans la plupart de vos tâches de réflexion", score: 0 }
    ]
  },
  {
    id: 9,
    theme: "Argumentation",
    question: "Pour défendre une position ou prendre une décision, vous...",
    friction: "Construction autonome",
    options: [
      { text: "Construisez d'abord vos propres arguments avant de consulter l'IA", score: 2 },
      { text: "Utilisez l'IA pour enrichir votre réflexion", score: 1 },
      { text: "Demandez à l'IA de vous donner les arguments pour et contre", score: 0 }
    ]
  },
  {
    id: 10,
    theme: "Projection",
    question: "Si l'IA générative disparaissait demain de votre vie professionnelle, vous...",
    friction: "Autonomie cognitive",
    options: [
      { text: "Continueriez à fonctionner avec vos propres ressources", score: 2 },
      { text: "Seriez ralenti mais vous adapteriez", score: 1 },
      { text: "Seriez significativement en difficulté", score: 0 }
    ]
  }
];

const profiles = [
  {
    range: [0, 5],
    title: "Sous-traitant Cognitif",
    emoji: "🚨",
    color: "#dc2626",
    bgColor: "rgba(220, 38, 38, 0.1)",
    description: "Votre pensée dépend fortement de l'IA. Que se passe-t-il quand elle n'est pas disponible ? Quand elle se trompe ? Quand elle vous influence sans que vous le perceviez ?",
    diagnostic: "Risque élevé d'atrophie cognitive. Les capacités de formulation, d'argumentation et de mémorisation sont probablement déjà affectées.",
    urgency: "Action urgente recommandée"
  },
  {
    range: [6, 10],
    title: "Délégateur Installé",
    emoji: "📉",
    color: "#ea580c",
    bgColor: "rgba(234, 88, 12, 0.1)",
    description: "Le déchargement cognitif est devenu votre mode par défaut. Certaines capacités s'érodent progressivement, souvent sans que vous en ayez conscience.",
    diagnostic: "Zone de vigilance. Les habitudes actuelles, si elles persistent, conduiront à une dépendance croissante.",
    urgency: "Réajustement conseillé"
  },
  {
    range: [11, 14],
    title: "Hybride Vigilant",
    emoji: "⚖️",
    color: "#ca8a04",
    bgColor: "rgba(202, 138, 4, 0.1)",
    description: "Vous avez trouvé un équilibre, mais certaines habitudes de déchargement s'installent. La frontière entre augmentation et substitution devient parfois floue.",
    diagnostic: "Position intermédiaire. Quelques ajustements ciblés peuvent consolider votre autonomie.",
    urgency: "Optimisation possible"
  },
  {
    range: [15, 20],
    title: "Penseur Souverain",
    emoji: "🧠",
    color: "#059669",
    bgColor: "rgba(5, 150, 105, 0.1)",
    description: "Vous maintenez activement votre autonomie cognitive. L'IA reste un outil que vous maîtrisez, pas une béquille dont vous dépendez.",
    diagnostic: "Position solide. Veillez à ne pas sous-utiliser des outils qui pourraient légitimement vous augmenter sur certaines tâches.",
    urgency: "Maintien et transmission"
  }
];

const allProfiles = [
  { range: [0, 5], title: "Sous-traitant Cognitif", color: "#dc2626", emoji: "🚨" },
  { range: [6, 10], title: "Délégateur Installé", color: "#ea580c", emoji: "📉" },
  { range: [11, 14], title: "Hybride Vigilant", color: "#ca8a04", emoji: "⚖️" },
  { range: [15, 20], title: "Penseur Souverain", color: "#059669", emoji: "🧠" }
];

const frictions = {
  "Premier Jet Manuel": {
    title: "Le Premier Jet Manuel",
    description: "Accordez-vous 5 minutes de réflexion avant d'ouvrir l'IA. Notez vos premières idées, même imparfaites.",
    icon: "✍️"
  },
  "Sparring Créatif": {
    title: "Le Sparring Créatif", 
    description: "Challengez les propositions de l'IA, demandez-lui de défendre ses choix, proposez des alternatives.",
    icon: "🥊"
  },
  "Pause Réflexive": {
    title: "La Pause Réflexive",
    description: "30 secondes avant d'accepter une suggestion. Ce temps suffit à réactiver votre jugement critique.",
    icon: "⏸️"
  },
  "Défi de Reformulation": {
    title: "Le Défi de Reformulation",
    description: "Tout contenu généré par l'IA doit passer par votre voix. Réécrivez, ne vous contentez pas d'ajuster.",
    icon: "🔄"
  },
  "Règle des 3 Pourquoi": {
    title: "La Règle des 3 Pourquoi",
    description: "Avant chaque usage : Pourquoi l'IA ? Pourquoi maintenant ? Pourquoi pas moi d'abord ?",
    icon: "❓"
  },
  "Mentor Inversé": {
    title: "Le Mentor Inversé",
    description: "Expliquez à l'IA où elle se trompe. Cette posture active votre esprit critique.",
    icon: "🎓"
  },
  "Test du Lendemain": {
    title: "Le Test du Lendemain",
    description: "Le jour suivant, essayez de refaire sans l'IA. Ce que vous ne pouvez reproduire, vous ne l'avez pas appris.",
    icon: "📅"
  },
  "Zone Sanctuaire": {
    title: "La Zone Sanctuaire",
    description: "Préservez des plages horaires 100% sans IA. Une heure par jour, une demi-journée par semaine.",
    icon: "🏝️"
  },
  "Construction autonome": {
    title: "La Construction Autonome",
    description: "Pour les sujets importants, construisez votre position avant de consulter l'IA.",
    icon: "🏗️"
  },
  "Autonomie cognitive": {
    title: "L'Autonomie Cognitive",
    description: "Testez-vous régulièrement : une journée, une tâche complexe, sans IA.",
    icon: "🧭"
  }
};

const products = [
  {
    title: "Conférence ISC™",
    subtitle: "Sensibilisation & prise de conscience",
    duration: "1h à 1h30",
    audience: "Tout public, équipes, direction",
    description: "Une intervention percutante pour comprendre les enjeux du déchargement cognitif et découvrir les premières frictions délibérées.",
    icon: "🎤"
  },
  {
    title: "Atelier Frictions Cognitives™",
    subtitle: "Pratique & appropriation",
    duration: "3h",
    audience: "Équipes opérationnelles",
    description: "Mise en pratique des 10 Frictions Cognitives Délibérées sur vos cas d'usage réels. Repartez avec votre protocole personnel.",
    icon: "🛠️"
  },
  {
    title: "Formation Souveraineté Cognitive",
    subtitle: "Transformation en profondeur",
    duration: "1 à 2 jours",
    audience: "Managers, experts, formateurs",
    description: "Maîtrisez la méthode complète : PSC, 8 Cadrans, Miroir Critique. Devenez ambassadeur de la souveraineté cognitive dans votre organisation.",
    icon: "🎓"
  }
];

// ⚠️ REMPLACER PAR TON ENDPOINT FORMSPREE
const FORMSPREE_ENDPOINT = "https://formspree.io/f/VOTRE_ID_ICI";

const AcculturiaLogo = ({ size = 60 }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="15,45 30,10 45,45" fill="#1a1a1a" />
    <rect x="38" y="12" width="28" height="28" fill="#1a1a1a" />
    <circle cx="82" cy="26" r="16" fill="#1a1a1a" />
  </svg>
);

function App() {
  const [stage, setStage] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleStart = () => {
    setAnimating(true);
    setTimeout(() => {
      setStage('questions');
      setAnimating(false);
    }, 500);
  };

  const handleSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const newAnswers = {
      ...answers,
      [currentQuestion]: {
        score: questions[currentQuestion].options[selectedOption].score,
        friction: questions[currentQuestion].friction
      }
    };
    setAnswers(newAnswers);
    setAnimating(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setStage('email');
      }
      setAnimating(false);
    }, 400);
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, a) => sum + a.score, 0);
  };

  const getProfile = () => {
    const score = calculateScore();
    return profiles.find(p => score >= p.range[0] && score <= p.range[1]);
  };

  const getWeakFrictions = () => {
    return Object.entries(answers)
      .filter(([_, a]) => a.score === 0)
      .map(([idx, a]) => frictions[a.friction])
      .slice(0, 3);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = async () => {
    const finalScore = calculateScore();
    const profile = profiles.find(p => finalScore >= p.range[0] && finalScore <= p.range[1]);
    
    if (!email.trim()) {
      setStage('result');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Veuillez entrer une adresse email valide');
      return;
    }
    
    setSubmitting(true);
    setEmailError('');
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          profil: profile.title,
          date: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        setEmailSubmitted(true);
        setTimeout(() => {
          setStage('result');
        }, 800);
      } else {
        setStage('result');
      }
    } catch (error) {
      console.error('Erreur envoi:', error);
      setStage('result');
    }
    
    setSubmitting(false);
  };

  const handleSkipEmail = () => {
    setStage('result');
  };

  const restart = () => {
    setStage('intro');
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
    setEmail('');
    setEmailSubmitted(false);
    setEmailError('');
  };

  const score = calculateScore();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#faf9f7',
      fontFamily: "'Source Serif 4', Georgia, serif",
      color: '#1a1a1a'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .fade-out {
          animation: fadeOut 0.4s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        .option-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .option-card:hover {
          background: #f0eeeb;
          border-color: #6366f1;
        }
        
        .option-card.selected {
          background: #eef2ff;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        
        .btn-primary {
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.25);
        }
        
        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .btn-secondary {
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: #f0eeeb;
        }
        
        .product-card {
          transition: all 0.3s ease;
        }
        
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
        }
        
        .friction-card {
          transition: all 0.3s ease;
        }
        
        .friction-card:hover {
          background: #f5f3f0;
        }
        
        input[type="email"] {
          font-family: 'DM Sans', sans-serif;
        }
        
        input[type="email"]:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
      `}</style>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '48px 28px',
        minHeight: '100vh'
      }}>

        {/* INTRO STAGE */}
        {stage === 'intro' && (
          <div className={`fade-in ${animating ? 'fade-out' : ''}`}>
            <header style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <AcculturiaLogo size={120} />
              </div>
              <div style={{
                fontSize: '36px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: '700',
                letterSpacing: '6px',
                color: '#1a1a1a',
                textTransform: 'uppercase'
              }}>
                ACCULTURIA
              </div>
            </header>

            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h1 style={{
                fontSize: 'clamp(28px, 5vw, 38px)',
                fontWeight: '700',
                lineHeight: '1.3',
                marginBottom: '12px',
                color: '#1a1a1a'
              }}>
                Indice de Souveraineté Cognitive
              </h1>
              <p style={{
                fontSize: 'clamp(36px, 7vw, 52px)',
                color: '#6366f1',
                fontWeight: '700',
                marginBottom: '8px',
                display: 'inline-flex',
                alignItems: 'baseline'
              }}>
                ISC<sup style={{ fontSize: '20px', fontFamily: "'DM Sans', sans-serif", fontWeight: '600' }}>™</sup>
              </p>
              <p style={{
                fontSize: '18px',
                fontFamily: "'DM Sans', sans-serif",
                color: '#737373',
                fontWeight: '500',
                marginTop: '16px'
              }}>
                Testez le vôtre
              </p>
              <div style={{
                width: '80px',
                height: '3px',
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                margin: '32px auto',
                borderRadius: '2px'
              }} />
            </div>

            <div style={{
              background: 'white',
              border: '2px solid #e8e6e3',
              borderRadius: '16px',
              padding: '36px',
              marginBottom: '40px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
            }}>
              <p style={{
                fontSize: '20px',
                lineHeight: '1.7',
                color: '#2d2d2d',
                marginBottom: '24px'
              }}>
                L'IA générative transforme notre façon de penser, d'écrire, de décider. 
                <strong> Mais savez-vous encore penser sans elle ?</strong>
              </p>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.7',
                color: '#525252'
              }}>
                Ce test évalue votre niveau de <strong style={{ color: '#1a1a1a' }}>déchargement 
                techno-cognitif</strong> — la tendance à déléguer à l'IA non seulement des tâches, 
                mais votre capacité même de réflexion.
              </p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '48px',
              marginBottom: '48px'
            }}>
              {[
                { num: '10', label: 'questions' },
                { num: '3', label: 'minutes' },
                { num: '1', label: 'diagnostic' }
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#6366f1'
                  }}>{item.num}</div>
                  <div style={{
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif",
                    color: '#737373',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginTop: '4px'
                  }}>{item.label}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleStart}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '22px 36px',
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: "'Source Serif 4', Georgia, serif",
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
            >
              Commencer le test
            </button>

            <p style={{
              textAlign: 'center',
              marginTop: '28px',
              fontSize: '17px',
              color: '#525252',
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: '1.6'
            }}>
              Répondez honnêtement et de façon spontanée,
              <br />afin d'évaluer vos pratiques actuelles.
            </p>
          </div>
        )}

        {/* QUESTIONS STAGE */}
        {stage === 'questions' && (
          <div className={`fade-in ${animating ? 'fade-out' : ''}`}>
            <header style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '32px'
            }}>
              <AcculturiaLogo size={50} />
              <span style={{
                fontSize: '20px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: '700',
                letterSpacing: '3px',
                color: '#1a1a1a',
                textTransform: 'uppercase'
              }}>
                ACCULTURIA
              </span>
            </header>

            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '48px'
            }}>
              {questions.map((_, i) => (
                <div 
                  key={i}
                  style={{
                    flex: 1,
                    height: '6px',
                    borderRadius: '3px',
                    background: i <= currentQuestion 
                      ? 'linear-gradient(90deg, #6366f1, #8b5cf6)' 
                      : '#e8e6e3',
                    transition: 'all 0.4s ease'
                  }}
                />
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '28px'
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px',
                fontWeight: '600',
                color: '#6366f1'
              }}>
                Question {currentQuestion + 1} sur {questions.length}
              </span>
              <span style={{
                fontSize: '14px',
                fontFamily: "'DM Sans', sans-serif",
                color: '#737373',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {questions[currentQuestion].theme}
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(22px, 4vw, 28px)',
              fontWeight: '600',
              lineHeight: '1.5',
              marginBottom: '36px',
              color: '#1a1a1a'
            }}>
              {questions[currentQuestion].question}
            </h2>

            <div style={{ marginBottom: '40px' }}>
              {questions[currentQuestion].options.map((option, i) => (
                <div
                  key={i}
                  className={`option-card ${selectedOption === i ? 'selected' : ''}`}
                  onClick={() => handleSelect(i)}
                  style={{
                    padding: '24px 28px',
                    marginBottom: '16px',
                    background: selectedOption === i ? '#eef2ff' : 'white',
                    border: `2px solid ${selectedOption === i ? '#6366f1' : '#e8e6e3'}`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: `3px solid ${selectedOption === i ? '#6366f1' : '#d1d5db'}`,
                    background: selectedOption === i ? '#6366f1' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                    transition: 'all 0.3s ease'
                  }}>
                    {selectedOption === i && (
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: 'white'
                      }} />
                    )}
                  </div>
                  <span style={{
                    fontSize: '18px',
                    lineHeight: '1.6',
                    color: selectedOption === i ? '#1a1a1a' : '#525252'
                  }}>
                    {option.text}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '20px 36px',
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: "'Source Serif 4', Georgia, serif",
                background: selectedOption !== null 
                  ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                  : '#d1d5db',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: selectedOption !== null ? 'pointer' : 'not-allowed'
              }}
            >
              {currentQuestion < questions.length - 1 ? 'Question suivante' : 'Voir mon diagnostic'}
            </button>
          </div>
        )}

        {/* EMAIL CAPTURE STAGE */}
        {stage === 'email' && (
          <div className="fade-in" style={{ textAlign: 'center' }}>
            <header style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '48px'
            }}>
              <AcculturiaLogo size={50} />
              <span style={{
                fontSize: '20px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: '700',
                letterSpacing: '3px',
                color: '#1a1a1a',
                textTransform: 'uppercase'
              }}>
                ACCULTURIA
              </span>
            </header>

            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                Votre diagnostic est prêt
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#525252',
                lineHeight: '1.6'
              }}>
                Recevez des conseils personnalisés
                <br />pour renforcer votre souveraineté cognitive.
              </p>
            </div>

            <div style={{
              background: 'white',
              border: '2px solid #e8e6e3',
              borderRadius: '16px',
              padding: '36px',
              marginBottom: '24px'
            }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: '500',
                color: '#525252',
                marginBottom: '12px',
                textAlign: 'left'
              }}>
                Votre adresse email (optionnel)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                placeholder="nom@exemple.com"
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  fontSize: '18px',
                  border: `2px solid ${emailError ? '#dc2626' : '#e8e6e3'}`,
                  borderRadius: '10px',
                  marginBottom: emailError ? '8px' : '24px',
                  background: '#faf9f7'
                }}
              />
              {emailError && (
                <p style={{
                  color: '#dc2626',
                  fontSize: '14px',
                  fontFamily: "'DM Sans', sans-serif",
                  textAlign: 'left',
                  marginBottom: '24px'
                }}>
                  {emailError}
                </p>
              )}
              
              <button
                onClick={handleEmailSubmit}
                disabled={submitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '20px 36px',
                  fontSize: '18px',
                  fontWeight: '600',
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  background: emailSubmitted 
                    ? '#059669' 
                    : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: submitting ? 'wait' : 'pointer'
                }}
              >
                {submitting ? 'Envoi...' : emailSubmitted ? '✓ Envoyé !' : 'Voir mon diagnostic'}
              </button>
            </div>

            <button
              onClick={handleSkipEmail}
              className="btn-secondary"
              style={{
                padding: '16px 24px',
                fontSize: '16px',
                fontFamily: "'DM Sans', sans-serif",
                background: 'transparent',
                color: '#737373',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Continuer sans email →
            </button>
          </div>
        )}

        {/* RESULT STAGE */}
        {stage === 'result' && (
          <div className="fade-in">
            {(() => {
              const profile = getProfile();
              const weakFrictions = getWeakFrictions();
              
              return (
                <>
                  {/* Header grand format */}
                  <header style={{
                    textAlign: 'center',
                    marginBottom: '32px'
                  }}>
                    <div style={{ marginBottom: '12px' }}>
                      <AcculturiaLogo size={80} />
                    </div>
                    <div style={{
                      fontSize: '28px',
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: '700',
                      letterSpacing: '4px',
                      color: '#1a1a1a',
                      textTransform: 'uppercase',
                      marginBottom: '8px'
                    }}>
                      ACCULTURIA
                    </div>
                    <div style={{
                      fontSize: 'clamp(20px, 4vw, 26px)',
                      fontWeight: '600',
                      color: '#525252',
                      marginBottom: '4px'
                    }}>
                      Indice de Souveraineté Cognitive
                    </div>
                    <div style={{
                      fontSize: 'clamp(28px, 5vw, 36px)',
                      fontWeight: '700',
                      color: '#6366f1'
                    }}>
                      ISC<sup style={{ fontSize: '14px', fontFamily: "'DM Sans', sans-serif" }}>™</sup>
                    </div>
                  </header>

                  {/* Profil principal - sans score numérique */}
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '40px'
                  }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                      {profile.emoji}
                    </div>
                    <h2 style={{
                      fontSize: 'clamp(28px, 5vw, 40px)',
                      fontWeight: '700',
                      color: profile.color,
                      marginBottom: '12px'
                    }}>
                      {profile.title}
                    </h2>
                    <p style={{
                      fontSize: '20px',
                      fontFamily: "'DM Sans', sans-serif",
                      color: profile.color,
                      fontWeight: '600'
                    }}>
                      {profile.urgency}
                    </p>
                  </div>

                  {/* Échelle visuelle - jauge sans chiffres */}
                  <div style={{
                    background: 'white',
                    border: '2px solid #e8e6e3',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px'
                  }}>
                    <h3 style={{
                      fontSize: '22px',
                      fontWeight: '600',
                      color: '#1a1a1a',
                      marginBottom: '28px',
                      textAlign: 'center'
                    }}>
                      Votre position
                    </h3>
                    
                    {/* Jauge colorée */}
                    <div style={{
                      position: 'relative',
                      height: '32px',
                      background: 'linear-gradient(90deg, #dc2626 0%, #ea580c 30%, #ca8a04 60%, #059669 100%)',
                      borderRadius: '16px',
                      marginBottom: '24px'
                    }}>
                      {/* Curseur de position */}
                      <div style={{
                        position: 'absolute',
                        left: `${(score / 20) * 100}%`,
                        top: '-12px',
                        transform: 'translateX(-50%)',
                        width: '56px',
                        height: '56px',
                        background: 'white',
                        border: `5px solid ${profile.color}`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
                      }}>
                        {profile.emoji}
                      </div>
                    </div>

                    {/* Labels de l'échelle */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '16px',
                      fontFamily: "'DM Sans', sans-serif",
                      color: '#737373',
                      marginBottom: '36px',
                      padding: '0 4px'
                    }}>
                      <span>← Dépendance</span>
                      <span>Autonomie →</span>
                    </div>

                    {/* Liste des 4 profils */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {allProfiles.map((p, i) => {
                        const isCurrentProfile = score >= p.range[0] && score <= p.range[1];
                        return (
                          <div 
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '16px',
                              padding: '18px 22px',
                              background: isCurrentProfile ? profile.bgColor : '#faf9f7',
                              border: isCurrentProfile ? `3px solid ${profile.color}` : '2px solid transparent',
                              borderRadius: '12px',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <div style={{
                              fontSize: '24px',
                              flexShrink: 0
                            }}>
                              {p.emoji}
                            </div>
                            <div style={{
                              flex: 1,
                              fontSize: '18px',
                              fontWeight: isCurrentProfile ? '700' : '400',
                              color: isCurrentProfile ? p.color : '#525252'
                            }}>
                              {p.title}
                              {isCurrentProfile && (
                                <span style={{ 
                                  marginLeft: '12px',
                                  fontSize: '15px',
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontWeight: '600',
                                  background: profile.color,
                                  color: 'white',
                                  padding: '4px 12px',
                                  borderRadius: '20px'
                                }}>
                                  Vous
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Diagnostic détaillé */}
                  <div style={{
                    background: profile.bgColor,
                    border: `2px solid ${profile.color}`,
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '32px'
                  }}>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      color: profile.color,
                      marginBottom: '16px'
                    }}>
                      Votre diagnostic
                    </h3>
                    <p style={{
                      fontSize: '19px',
                      lineHeight: '1.7',
                      color: '#2d2d2d',
                      marginBottom: '20px'
                    }}>
                      {profile.description}
                    </p>
                    <p style={{
                      fontSize: '17px',
                      lineHeight: '1.6',
                      color: '#525252',
                      padding: '18px 22px',
                      background: 'rgba(255,255,255,0.7)',
                      borderRadius: '10px',
                      borderLeft: `4px solid ${profile.color}`
                    }}>
                      <strong>Analyse :</strong> {profile.diagnostic}
                    </p>
                  </div>

                  {/* Frictions recommandées */}
                  {weakFrictions.length > 0 && (
                    <div style={{
                      background: 'white',
                      border: '2px solid #e8e6e3',
                      borderRadius: '16px',
                      padding: '32px',
                      marginBottom: '32px'
                    }}>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#1a1a1a',
                        marginBottom: '8px'
                      }}>
                        Frictions Cognitives Recommandées
                      </h3>
                      <p style={{
                        fontSize: '17px',
                        color: '#737373',
                        fontFamily: "'DM Sans', sans-serif",
                        marginBottom: '24px'
                      }}>
                        Des pratiques simples pour renforcer votre souveraineté cognitive
                      </p>
                      <div>
                        {weakFrictions.map((friction, i) => (
                          <div 
                            key={i}
                            className="friction-card"
                            style={{
                              padding: '22px 26px',
                              background: '#faf9f7',
                              borderRadius: '12px',
                              marginBottom: '12px',
                              border: '1px solid #e8e6e3'
                            }}
                          >
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '14px',
                              marginBottom: '10px'
                            }}>
                              <span style={{ fontSize: '32px' }}>{friction.icon}</span>
                              <span style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                color: '#1a1a1a'
                              }}>
                                {friction.title}
                              </span>
                            </div>
                            <p style={{
                              fontSize: '17px',
                              lineHeight: '1.6',
                              color: '#525252',
                              margin: 0,
                              paddingLeft: '46px'
                            }}>
                              {friction.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Produits / CTA */}
                  <div style={{
                    background: 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 100%)',
                    border: '2px solid #c7d2fe',
                    borderRadius: '16px',
                    padding: '36px',
                    marginBottom: '32px'
                  }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                      <h3 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#1a1a1a',
                        marginBottom: '12px'
                      }}>
                        Aller plus loin
                      </h3>
                      <p style={{
                        fontSize: '19px',
                        color: '#525252',
                        maxWidth: '500px',
                        margin: '0 auto'
                      }}>
                        Formez-vous et formez vos équipes à la souveraineté cognitive
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {products.map((product, i) => (
                        <div 
                          key={i}
                          className="product-card"
                          style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '26px',
                            border: '1px solid #e5e7eb',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'flex-start'
                          }}>
                            <div style={{
                              fontSize: '40px',
                              lineHeight: 1
                            }}>
                              {product.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                color: '#1a1a1a',
                                marginBottom: '4px'
                              }}>
                                {product.title}
                              </h4>
                              <p style={{
                                fontSize: '15px',
                                fontFamily: "'DM Sans', sans-serif",
                                color: '#6366f1',
                                fontWeight: '500',
                                marginBottom: '10px'
                              }}>
                                {product.subtitle}
                              </p>
                              <p style={{
                                fontSize: '16px',
                                color: '#525252',
                                lineHeight: '1.5',
                                marginBottom: '12px'
                              }}>
                                {product.description}
                              </p>
                              <div style={{
                                display: 'flex',
                                gap: '16px',
                                fontSize: '14px',
                                fontFamily: "'DM Sans', sans-serif",
                                color: '#737373'
                              }}>
                                <span>⏱ {product.duration}</span>
                                <span>👥 {product.audience}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '32px' }}>
                      <a 
                        href={`mailto:francoisluc@acculturia.com?subject=Demande%20d'information%20ISC&body=Bonjour,%0A%0AJ'ai%20réalisé%20le%20test%20ISC%20et%20mon%20profil%20est%20:%20${encodeURIComponent(profile.title)}.%0A%0AJe%20souhaiterais%20en%20savoir%20plus%20sur%20vos%20interventions.%0A%0ACordialement`}
                        style={{
                          display: 'inline-block',
                          padding: '20px 40px',
                          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '12px',
                          fontSize: '20px',
                          fontWeight: '600',
                          fontFamily: "'Source Serif 4', Georgia, serif"
                        }}
                      >
                        Demander un devis
                      </a>
                      <p style={{
                        marginTop: '18px',
                        fontSize: '16px',
                        color: '#737373',
                        fontFamily: "'DM Sans', sans-serif"
                      }}>
                        ou contactez : <a href="mailto:francoisluc@acculturia.com" style={{ color: '#6366f1' }}>francoisluc@acculturia.com</a>
                      </p>
                    </div>
                  </div>

                  {/* Refaire le test */}
                  <button
                    onClick={restart}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      padding: '18px',
                      background: 'white',
                      border: '2px solid #e8e6e3',
                      borderRadius: '12px',
                      color: '#737373',
                      fontSize: '17px',
                      cursor: 'pointer',
                      fontFamily: "'Source Serif 4', Georgia, serif"
                    }}
                  >
                    Refaire le test
                  </button>

                  {/* Footer */}
                  <footer style={{
                    textAlign: 'center',
                    marginTop: '48px',
                    paddingTop: '32px',
                    borderTop: '1px solid #e8e6e3'
                  }}>
                    <p style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      color: '#1a1a1a',
                      marginBottom: '12px'
                    }}>
                      Ne pas sous-traiter sa pensée.
                    </p>
                    <p style={{
                      fontSize: '15px',
                      fontFamily: "'DM Sans', sans-serif",
                      color: '#737373'
                    }}>
                      Test ISC™ — Indice de Souveraineté Cognitive<br />
                      © 2025 François-Luc Moraud — Acculturia
                    </p>
                  </footer>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
