import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronRight, Lock, PlayCircle } from 'lucide-react';

export default function LearningSidebar({ modules, activeSectionId, statusFor, labels, onSelect }) {
  const [openModules, setOpenModules] = useState(() => new Set(modules.map((module) => module.id)));

  function toggle(moduleId) {
    const next = new Set(openModules);
    if (next.has(moduleId)) next.delete(moduleId);
    else next.add(moduleId);
    setOpenModules(next);
  }

  return (
    <aside className="w-full md:w-[360px] md:max-w-[360px] md:h-[calc(100vh-140px)] md:sticky md:top-24 border rounded-xl bg-card overflow-hidden flex flex-col">
      <div className="p-4 border-b bg-muted/30">
        <div className="text-sm font-semibold text-primary">{labels.courseNavigation}</div>
        <div className="text-xs text-muted-foreground mt-1">{labels.unlockPathHelp}</div>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {modules.map((module, moduleIndex) => {
          const isOpen = openModules.has(module.id);
          const moduleLocked = module.sections.every((section) => statusFor(section.sectionId) === 'locked');

          return (
            <div key={module.id} className="mb-3">
              <button
                type="button"
                onClick={() => toggle(module.id)}
                className="w-full flex items-start gap-2 rounded-lg px-3 py-2 text-left hover:bg-muted"
              >
                {isOpen ? <ChevronDown className="h-4 w-4 mt-0.5" /> : <ChevronRight className="h-4 w-4 mt-0.5" />}
                <div className="flex-1">
                  <div className="text-xs font-medium text-muted-foreground uppercase">{labels.module} {moduleIndex + 1}</div>
                  <div className="font-semibold text-sm leading-snug">{module.title}</div>
                </div>
                {moduleLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
              </button>

              {isOpen && (
                <div className="mt-1 space-y-1 pl-3">
                  {module.sections.map((section) => {
                    const status = statusFor(section.sectionId);
                    const active = activeSectionId === section.sectionId;
                    const Icon = status === 'completed' ? CheckCircle2 : status === 'locked' ? Lock : PlayCircle;

                    return (
                      <button
                        type="button"
                        key={section.sectionId}
                        disabled={status === 'locked'}
                        onClick={() => onSelect(section.sectionId)}
                        className={`w-full flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          active
                            ? 'bg-primary text-primary-foreground font-medium'
                            : status === 'locked'
                              ? 'text-muted-foreground/70 cursor-not-allowed'
                              : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        <Icon className={`h-4 w-4 flex-shrink-0 ${active ? 'text-primary-foreground/90' : ''}`} />
                        <span className="line-clamp-2">{section.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
