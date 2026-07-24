export function flattenLearningModules(modules) {
  return modules.flatMap((module) => module.sections.map((section) => ({
    ...section,
    module,
  })));
}

export function getSectionStatus(sections, completedSectionIds, sectionId) {
  const index = sections.findIndex((section) => section.sectionId === sectionId);
  if (index === -1) return 'locked';
  if (completedSectionIds.has(sectionId)) return 'completed';
  if (index === 0) return 'unlocked';
  return completedSectionIds.has(sections[index - 1].sectionId) ? 'unlocked' : 'locked';
}

export function getNextUnlockedSection(sections, completedSectionIds) {
  return sections.find((section) => getSectionStatus(sections, completedSectionIds, section.sectionId) === 'unlocked') || sections[0];
}
