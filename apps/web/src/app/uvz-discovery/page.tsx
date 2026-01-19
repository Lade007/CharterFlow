'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { TextReveal } from '@/components/ui/text-reveal';

interface UVZStep {
  id: string;
  title: string;
  description: string;
  type: 'skills' | 'pains' | 'mapping' | 'validation';
}

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

interface Pain {
  id: string;
  description: string;
  severity: number;
  frequency: number;
}

interface UVZMapping {
  skillId: string;
  painId: string;
  strength: number;
  opportunity: string;
}

export default function UVZDiscoveryPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [pains, setPains] = useState<Pain[]>([]);
  const [mappings, setMappings] = useState<UVZMapping[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newPain, setNewPain] = useState('');

  const steps: UVZStep[] = [
    {
      id: 'skills',
      title: 'Identify Your Skills',
      description: 'List your core competencies, expertise areas, and what you do exceptionally well.',
      type: 'skills'
    },
    {
      id: 'pains',
      title: 'Understand Market Pains',
      description: 'Identify the specific problems, challenges, and frustrations your target market faces.',
      type: 'pains'
    },
    {
      id: 'mapping',
      title: 'Map Skills to Pains',
      description: 'Connect your skills to the pains they solve to find your unique value zone.',
      type: 'mapping'
    },
    {
      id: 'validation',
      title: 'Validate Your UVZ',
      description: 'Review and refine your unique value zone with market validation.',
      type: 'validation'
    }
  ];

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill,
        category: 'technical',
        proficiency: 5
      };
      setSkills([...skills, skill]);
      setNewSkill('');
    }
  };

  const addPain = () => {
    if (newPain.trim()) {
      const pain: Pain = {
        id: Date.now().toString(),
        description: newPain,
        severity: 5,
        frequency: 5
      };
      setPains([...pains, pain]);
      setNewPain('');
    }
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const removePain = (id: string) => {
    setPains(pains.filter(pain => pain.id !== id));
  };

  const updateSkillProficiency = (id: string, proficiency: number) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, proficiency } : skill
    ));
  };

  const updatePainSeverity = (id: string, severity: number) => {
    setPains(pains.map(pain => 
      pain.id === id ? { ...pain, severity } : pain
    ));
  };

  const createMapping = (skillId: string, painId: string) => {
    const existingMapping = mappings.find(m => m.skillId === skillId && m.painId === painId);
    if (!existingMapping) {
      const mapping: UVZMapping = {
        skillId,
        painId,
        strength: 5,
        opportunity: `${skills.find(s => s.id === skillId)?.name} solves ${pains.find(p => p.id === painId)?.description}`
      };
      setMappings([...mappings, mapping]);
    }
  };

  const removeMapping = (skillId: string, painId: string) => {
    setMappings(mappings.filter(m => !(m.skillId === skillId && m.painId === painId)));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (steps[currentStep].type) {
      case 'skills':
        return skills.length >= 3;
      case 'pains':
        return pains.length >= 3;
      case 'mapping':
        return mappings.length >= 2;
      case 'validation':
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].type) {
      case 'skills':
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Enter a skill (e.g., 'React Development', 'Product Strategy')"
                className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button onClick={addSkill} variant="primary">
                Add Skill
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <GlassCard key={skill.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-neutral-900">{skill.name}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-neutral-600">Proficiency Level:</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={skill.proficiency}
                      onChange={(e) => updateSkillProficiency(skill.id, parseInt(e.target.value))}
                      className="w-full"
                      title={`Proficiency level for ${skill.name}`}
                      aria-label={`Proficiency level for ${skill.name}`}
                    />
                    <div className="text-xs text-neutral-500">Level: {skill.proficiency}/10</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        );

      case 'pains':
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={newPain}
                onChange={(e) => setNewPain(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPain()}
                placeholder="Describe a pain point (e.g., 'Slow development process', 'Poor user onboarding')"
                className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button onClick={addPain} variant="primary">
                Add Pain
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pains.map((pain) => (
                <GlassCard key={pain.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-neutral-900">{pain.description}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removePain(pain.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-neutral-600">Severity Level:</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={pain.severity}
                      onChange={(e) => updatePainSeverity(pain.id, parseInt(e.target.value))}
                      className="w-full"
                      title={`Severity level for ${pain.description}`}
                      aria-label={`Severity level for ${pain.description}`}
                    />
                    <div className="text-xs text-neutral-500">Severity: {pain.severity}/10</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        );

      case 'mapping':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-neutral-600">
                Click on skills and pains to create connections. Strong connections represent your unique value zone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Skills</h3>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <GlassCard key={skill.id} className="p-3 cursor-pointer hover:bg-primary-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                          Level {skill.proficiency}
                        </span>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Market Pains</h3>
                <div className="space-y-2">
                  {pains.map((pain) => (
                    <GlassCard key={pain.id} className="p-3 cursor-pointer hover:bg-red-50">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{pain.description}</span>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          Severity {pain.severity}
                        </span>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>
            
            {mappings.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Your UVZ Mappings</h3>
                <div className="space-y-2">
                  {mappings.map((mapping, index) => (
                    <GlassCard key={index} className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-neutral-900">{mapping.opportunity}</p>
                          <p className="text-sm text-neutral-600 mt-1">
                            Strength: {mapping.strength}/10
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeMapping(mapping.skillId, mapping.painId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'validation':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Your Unique Value Zone
              </h3>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Based on your skills and the market pains they solve, here's your validated unique value zone:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mappings.slice(0, 3).map((mapping, index) => (
                <GlassCard key={index} className="p-6 text-center">
                  <div className="text-3xl mb-4">🎯</div>
                  <h4 className="font-semibold text-neutral-900 mb-2">
                    {skills.find(s => s.id === mapping.skillId)?.name}
                  </h4>
                  <p className="text-sm text-neutral-600 mb-4">
                    {pains.find(p => p.id === mapping.painId)?.description}
                  </p>
                  <div className="bg-gradient-to-r from-primary-100 to-secondary-100 p-3 rounded-lg">
                    <p className="text-sm font-medium text-primary-900">
                      {mapping.opportunity}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => router.push('/product-charter')}
                className="px-8 py-4"
              >
                Generate Product Charter
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TextReveal delay={200}>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              UVZ Discovery Wizard
            </h1>
            <p className="text-lg text-neutral-600">
              Find your Unique Value Zone by mapping your skills to market pains
            </p>
          </div>
        </TextReveal>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 ${
                      index < currentStep ? 'bg-primary-600' : 'bg-neutral-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step */}
        <TextReveal delay={400}>
          <GlassCard className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-neutral-600">
                {steps[currentStep].description}
              </p>
            </div>

            {renderStepContent()}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                onClick={nextStep}
                disabled={!canProceed()}
              >
                {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              </Button>
            </div>
          </GlassCard>
        </TextReveal>
      </div>
    </div>
  );
}
