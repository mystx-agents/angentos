"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, User, Bell, Palette, Bot, Shield, 
  Key, Cpu, Activity, Save, RefreshCw
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    theme: 'dark',
    language: 'en',
    notifications: true,
    autoReply: false,
    aiTemperature: 0.7,
    maxTokens: 2048,
    replyDelay: 1000,
    memoryLimits: 100,
    analytics: true,
    apiKey: 'sk-xxxxxxxxxxxxxxxxxxxx',
    twoFactor: false
  });

  const handleSave = () => {
    setIsLoading(true);
    // Mock save
    setTimeout(() => {
      setIsLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  const updateSetting = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <Settings className="w-4 h-4" /> },
    { id: 'ai', label: 'AI Core', icon: <Bot className="w-4 h-4" /> },
    { id: 'security', label: 'Security & API', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      {/* Header Background */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.15),rgba(255,255,255,0))] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-24 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <Cpu className="w-8 h-8 text-blue-400 mr-3" />
              System Configuration
            </h1>
            <p className="text-slate-400">Manage your AgentOS control node settings</p>
          </div>
          
          <Button 
            onClick={handleSave} 
            isLoading={isLoading}
            className="hidden sm:flex"
          >
            {saved ? <RefreshCw className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {saved ? 'Saved!' : 'Save Configuration'}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Nav */}
          <div className="w-full md:w-64 shrink-0 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent'}`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <GlassCard className="flex-1 p-6 md:p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'general' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Palette className="w-5 h-5 mr-2 text-blue-400" />
                      Appearance & Locale
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Theme</label>
                        <select 
                          value={settings.theme}
                          onChange={(e) => updateSetting('theme', e.target.value)}
                          className="w-full h-11 rounded-xl bg-black/20 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                        >
                          <option value="dark">Dark Mode (AgentOS Default)</option>
                          <option value="light">Light Mode</option>
                          <option value="system">System Default</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Language</label>
                        <select 
                          value={settings.language}
                          onChange={(e) => updateSetting('language', e.target.value)}
                          className="w-full h-11 rounded-xl bg-black/20 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                        >
                          <option value="en">English (US)</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="jp">Japanese</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-blue-400" />
                      Notifications & Analytics
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">System Notifications</p>
                          <p className="text-sm text-slate-400">Receive alerts for agent activities.</p>
                        </div>
                        <Switch 
                          checked={settings.notifications} 
                          onCheckedChange={(c) => updateSetting('notifications', c)} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Usage Analytics</p>
                          <p className="text-sm text-slate-400">Share anonymized metrics to improve AgentOS.</p>
                        </div>
                        <Switch 
                          checked={settings.analytics} 
                          onCheckedChange={(c) => updateSetting('analytics', c)} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Bot className="w-5 h-5 mr-2 text-purple-400" />
                      Behavior Engine
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Autonomous Auto-Reply</p>
                          <p className="text-sm text-slate-400">Allow agent to respond to incoming messages automatically.</p>
                        </div>
                        <Switch 
                          checked={settings.autoReply} 
                          onCheckedChange={(c) => updateSetting('autoReply', c)} 
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium text-slate-400">Creativity / Temperature</label>
                          <span className="text-sm text-purple-400">{settings.aiTemperature}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" max="2" step="0.1"
                          value={settings.aiTemperature}
                          onChange={(e) => updateSetting('aiTemperature', parseFloat(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium text-slate-400">Reply Delay (ms)</label>
                          <span className="text-sm text-purple-400">{settings.replyDelay}ms</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" max="5000" step="100"
                          value={settings.replyDelay}
                          onChange={(e) => updateSetting('replyDelay', parseInt(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-purple-400" />
                      Resource Limits
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Max Tokens per Response</label>
                        <Input 
                          type="number" 
                          value={settings.maxTokens}
                          onChange={(e) => updateSetting('maxTokens', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Context Memory (Messages)</label>
                        <Input 
                          type="number" 
                          value={settings.memoryLimits}
                          onChange={(e) => updateSetting('memoryLimits', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Key className="w-5 h-5 mr-2 text-emerald-400" />
                      API Keys
                    </h2>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Primary Provider Key (OpenAI / Anthropic)</label>
                      <div className="flex gap-3">
                        <Input 
                          type="password" 
                          value={settings.apiKey}
                          onChange={(e) => updateSetting('apiKey', e.target.value)}
                        />
                        <Button variant="secondary">Verify</Button>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Required for the core intelligence engine to function.</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                      Account Security
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Two-Factor Authentication</p>
                          <p className="text-sm text-slate-400">Require an additional code on startup.</p>
                        </div>
                        <Switch 
                          checked={settings.twoFactor} 
                          onCheckedChange={(c) => updateSetting('twoFactor', c)} 
                        />
                      </div>
                      
                      <div className="pt-4">
                        <Button variant="danger" className="w-full sm:w-auto">
                          Terminate Active Sessions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </GlassCard>
        </div>
        
        {/* Mobile Save Button */}
        <div className="mt-8 sm:hidden">
          <Button 
            onClick={handleSave} 
            isLoading={isLoading}
            className="w-full h-12"
          >
            {saved ? <RefreshCw className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {saved ? 'Saved!' : 'Save Configuration'}
          </Button>
        </div>

      </div>
    </div>
  );
}
