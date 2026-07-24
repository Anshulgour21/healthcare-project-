export const languages = ['all', 'English', 'Hindi', 'Gujarati'];

export const DEFAULT_SECTION_VIDEO_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

const DIABETES_VIDEOS = {
  overview: '/videos/What_is_Diabetes.mp4',
  symptoms: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Could_You_Have_Prediabetes.webm',
  monitoring: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Managing_Diabetes.webm',
  education: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Friends,_Family_and_Diabetes.webm',
  medicationAccess: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Skipping_Drugs_She_Can%27t_Afford.webm',
  hypoglycemiaSafety: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Diabetes_Information_You_Can_Trust.webm',
  footComplications: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Managing_Complications.webm',
  followUp: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Diabetes_and_Your_Heart.webm',
};

export const courses = [
  {
    id: 'healthcare-english-diabetes-care',
    title: 'Diabetes Care Essentials',
    description: 'Learn the fundamentals of diabetes management, blood glucose monitoring, patient education, and prevention of complications.',
    category: 'Chronic Disease Management',
    language: 'English',
    level: 'beginner',
    thumbnailUrl: '/images/diabetes.png',
    totalEnrollments: 284,
    modules: [
      {
        id: 'diabetes-module-1',
        title: 'Understanding Diabetes',
        description: 'Learn the types, causes, and symptoms of diabetes.',
        order: 1,
        topics: [
          {
            id: 'diabetes-topic-1',
            title: 'Types of Diabetes',
            contentType: 'video',
            videoUrl: DIABETES_VIDEOS.overview,
            durationMinutes: 10,
            textContent: 'Diabetes is a chronic condition affecting blood glucose regulation. Common types include Type 1, Type 2, and Gestational Diabetes.'
          },
          {
            id: 'diabetes-topic-2',
            title: 'Recognizing Symptoms',
            contentType: 'video',
            videoUrl: DIABETES_VIDEOS.symptoms,
            durationMinutes: 8,
            textContent: 'Identify common symptoms such as excessive thirst, frequent urination, fatigue, and blurred vision.'
          },
          {
            id: 'diabetes-topic-flipcard',
            title: 'Exercise',
            contentType: 'flipcard',
            durationMinutes: 5,
            textContent: 'Flip the cards to test your understanding of diabetes terms.',
            flashcards: [
              { front: 'What are the three main types of diabetes?', back: 'Type 1, Type 2, and Gestational Diabetes.' },
              { front: 'What is considered a normal fasting blood glucose level?', back: 'Under 100 mg/dL (5.6 mmol/L) is normal. 100 to 125 mg/dL is prediabetes.' },
              { front: 'Name three common symptoms of diabetes.', back: 'Increased thirst, frequent urination, and unexplained weight loss.' },
              { front: 'What does the HbA1c test measure?', back: 'Average blood sugar levels over the past 2 to 3 months.' },
              { front: 'Why is daily foot inspection important for diabetic patients?', back: 'To detect cuts, blisters, or sores early that could lead to severe infections due to reduced nerve sensitivity (neuropathy).' },
              { front: 'What should a person do if they show signs of hypoglycemia (low blood sugar)?', back: 'Consume 15 grams of fast-acting sugar immediately, recheck in 15 minutes, and seek care if symptoms persist.' }
            ]
          }
        ],
        assessment: {
          id: 'diabetes-assessment-1',
          passingScore: 70,
          questions: [
            {
              type: 'single-choice',
              text: 'Which type of diabetes is most common?',
              options: ['Type 1', 'Type 2', 'Gestational'],
              correctOption: 1,
              explanation: 'Type 2 diabetes is the most common form and is strongly linked with insulin resistance.'
            },
            {
              type: 'true-false',
              text: 'Frequent urination can be a symptom of diabetes.',
              options: ['True', 'False'],
              correctOption: 0,
              explanation: 'Frequent urination can occur when high glucose levels cause the body to remove excess sugar through urine.'
            },
            {
              type: 'multiple-select',
              text: 'Select the actions that support safe diabetes self-management.',
              options: ['Regular glucose monitoring', 'Skipping follow-up visits', 'Foot inspection', 'Medication adherence'],
              correctAnswer: ['Regular glucose monitoring', 'Foot inspection', 'Medication adherence'],
              explanation: 'Monitoring, foot checks, and adherence reduce complications and support early intervention.'
            },
            {
              type: 'match-the-following',
              text: 'Match each diabetes care term with its purpose.',
              pairs: [
                { left: 'HbA1c', right: 'Long-term glucose control' },
                { left: 'Foot check', right: 'Detect ulcers early' },
                { left: 'Meal planning', right: 'Support stable glucose' }
              ],
              choices: ['Detect ulcers early', 'Support stable glucose', 'Long-term glucose control'],
              correctAnswer: {
                HbA1c: 'Long-term glucose control',
                'Foot check': 'Detect ulcers early',
                'Meal planning': 'Support stable glucose'
              },
              explanation: 'Each tool supports a different part of diabetes safety and follow-up.'
            },
            {
              type: 'ordering',
              text: 'Drag the steps into the recommended glucose monitoring order.',
              items: ['Wash hands', 'Prepare strip and meter', 'Prick finger safely', 'Apply blood sample', 'Record reading'],
              correctAnswer: ['Wash hands', 'Prepare strip and meter', 'Prick finger safely', 'Apply blood sample', 'Record reading'],
              explanation: 'A clean, prepared, documented workflow improves accuracy and safety.'
            },
            {
              type: 'scenario',
              text: 'Scenario: A patient reports dizziness, sweating, and confusion after taking insulin but skipping lunch. What should the health worker do first?',
              scenario: 'A patient has symptoms suggesting hypoglycemia after insulin use and missed food intake.',
              options: ['Offer fast-acting glucose if conscious', 'Ask them to exercise', 'Delay action until the next visit'],
              correctAnswer: 'Offer fast-acting glucose if conscious',
              explanation: 'If the patient is conscious and hypoglycemia is suspected, fast-acting glucose is the immediate priority.'
            },
            {
              type: 'short-answer',
              text: 'Short answer: What routine check helps detect diabetic foot complications early?',
              correctAnswer: 'foot inspection',
              explanation: 'Routine foot inspection helps detect wounds, ulcers, or sensation changes early.'
            },
          ]
        }
      },
      {
        id: 'diabetes-module-2',
        title: 'Monitoring and Patient Education',
        description: 'Teach patients how to manage diabetes safely.',
        order: 2,
        topics: [
          {
            id: 'diabetes-topic-3',
            title: 'Blood Glucose Monitoring',
            contentType: 'video',
            videoUrl: DIABETES_VIDEOS.monitoring,
            durationMinutes: 12,
            textContent: 'Regular monitoring helps patients understand their glucose trends and treatment effectiveness.'
          },
          {
            id: 'diabetes-topic-4',
            title: 'Patient Education for Daily Care',
            contentType: 'video',
            videoUrl: DIABETES_VIDEOS.education,
            durationMinutes: 9,
            textContent: 'Teach patients how to connect meals, medication timing, activity, and glucose readings into a safe daily routine.'
          },
          {
            id: 'diabetes-topic-mismatch',
            title: 'Exercise',
            contentType: 'mismatch',
            durationMinutes: 5,
            textContent: 'Match each glucose monitoring reading or technique with the correct clinical guidance.',
            pairs: [
              { left: 'High Reading', right: 'Check for ketones or symptoms' },
              { left: 'Low Reading', right: 'Consume 15g fast-acting sugar' },
              { left: 'Logbook', right: 'Record glucose, food, and insulin' },
              { left: 'Teach-Back', right: 'Ask patient to repeat instructions' }
            ]
          }
        ],
        assessment: {
          id: 'diabetes-assessment-2',
          passingScore: 70,
          questions: [
            {
              text: 'Why is blood glucose monitoring important?',
              options: ['Track diabetes control', 'Measure blood pressure', 'Detect fractures'],
              correctOption: 0,
              explanation: 'Blood glucose monitoring helps patients and care teams understand treatment response and daily glucose patterns.'
            },
            {
              type: 'match-the-following',
              text: 'Match each monitoring item with the correct action.',
              pairs: [
                { left: 'High reading', right: 'Review food, medicine, and symptoms' },
                { left: 'Low reading', right: 'Treat quickly if symptomatic' },
                { left: 'Logbook', right: 'Record value and context' }
              ],
              choices: ['Record value and context', 'Treat quickly if symptomatic', 'Review food, medicine, and symptoms'],
              correctAnswer: {
                'High reading': 'Review food, medicine, and symptoms',
                'Low reading': 'Treat quickly if symptomatic',
                Logbook: 'Record value and context'
              },
              explanation: 'Monitoring is useful when readings are connected to symptoms, actions, and clear documentation.'
            },
            {
              type: 'ordering',
              text: 'Drag the patient education steps into a safe coaching sequence.',
              items: ['Ask what the patient already knows', 'Explain one key habit', 'Demonstrate the habit', 'Ask the patient to repeat it back'],
              correctAnswer: ['Ask what the patient already knows', 'Explain one key habit', 'Demonstrate the habit', 'Ask the patient to repeat it back'],
              explanation: 'Teach-back confirms understanding and keeps diabetes education practical.'
            }
          ]
        }
      },
      {
        id: 'diabetes-module-3',
        title: 'Medication and Hypoglycemia Safety',
        description: 'Recognize medication safety checks and respond quickly to low blood sugar.',
        order: 3,
        topics: [
          {
            id: 'diabetes-topic-5',
            title: 'Medication Timing and Safety',
            contentType: 'video',
            videoUrl: DIABETES_VIDEOS.medicationAccess,
            durationMinutes: 11,
            textContent: 'Safe medication routines include confirming the medicine, dose, timing, meals, and signs of low glucose before coaching the patient.'
          },
          {
            id: 'diabetes-topic-6',
            title: 'Responding to Hypoglycemia',
            contentType: 'video',
            videoUrl: DIABETES_VIDEOS.hypoglycemiaSafety,
            durationMinutes: 10,
            textContent: 'Hypoglycemia may present with sweating, shaking, hunger, confusion, dizziness, or weakness and requires quick action.'
          }
        ],
        assessment: {
          id: 'diabetes-assessment-3',
          passingScore: 70,
          questions: [
            {
              type: 'match-the-following',
              text: 'Match each safety signal with the best response.',
              pairs: [
                { left: 'Sweating and confusion', right: 'Check for possible low glucose' },
                { left: 'Missed meal after insulin', right: 'Assess urgently for hypoglycemia' },
                { left: 'New medication dose', right: 'Confirm instructions and follow-up plan' }
              ],
              choices: ['Assess urgently for hypoglycemia', 'Confirm instructions and follow-up plan', 'Check for possible low glucose'],
              correctAnswer: {
                'Sweating and confusion': 'Check for possible low glucose',
                'Missed meal after insulin': 'Assess urgently for hypoglycemia',
                'New medication dose': 'Confirm instructions and follow-up plan'
              },
              explanation: 'Medication safety depends on connecting symptoms and context to the right response.'
            },
            {
              type: 'ordering',
              text: 'Drag the hypoglycemia response into the safest order.',
              items: ['Recognize symptoms', 'Check glucose if available', 'Give fast-acting carbohydrate if conscious', 'Recheck and escalate if not improving'],
              correctAnswer: ['Recognize symptoms', 'Check glucose if available', 'Give fast-acting carbohydrate if conscious', 'Recheck and escalate if not improving'],
              explanation: 'A quick, ordered response reduces risk during suspected low glucose.'
            }
          ]
        }
      },
      {
        id: 'diabetes-module-4',
        title: 'Complication Prevention and Follow-up',
        description: 'Support foot care, warning sign escalation, and ongoing follow-up routines.',
        order: 4,
        topics: [
          {
            id: 'diabetes-topic-7',
            title: 'Foot Care and Skin Checks',
            contentType: 'video',
            videoUrl: DIABETES_VIDEOS.footComplications,
            durationMinutes: 10,
            textContent: 'Daily foot inspection, comfortable footwear, and early reporting of wounds help prevent serious diabetic foot complications.'
          },
          {
            id: 'diabetes-topic-8',
            title: 'Follow-up and Referral Planning',
            contentType: 'video',
            videoUrl: DIABETES_VIDEOS.followUp,
            durationMinutes: 12,
            textContent: 'Follow-up planning includes review dates, warning signs, medication access, lab checks, and referral pathways for urgent concerns.'
          }
        ],
        assessment: {
          id: 'diabetes-assessment-4',
          passingScore: 70,
          questions: [
            {
              type: 'match-the-following',
              text: 'Match each follow-up item with why it matters.',
              pairs: [
                { left: 'Foot inspection', right: 'Find wounds early' },
                { left: 'HbA1c review', right: 'Track long-term control' },
                { left: 'Referral plan', right: 'Escalate danger signs quickly' }
              ],
              choices: ['Track long-term control', 'Escalate danger signs quickly', 'Find wounds early'],
              correctAnswer: {
                'Foot inspection': 'Find wounds early',
                'HbA1c review': 'Track long-term control',
                'Referral plan': 'Escalate danger signs quickly'
              },
              explanation: 'Follow-up is safer when prevention, monitoring, and referral actions are clearly linked.'
            },
            {
              type: 'ordering',
              text: 'Drag the foot check workflow into the right order.',
              items: ['Inspect skin and between toes', 'Check for redness, cuts, or swelling', 'Ask about numbness or pain', 'Document and refer concerning findings'],
              correctAnswer: ['Inspect skin and between toes', 'Check for redness, cuts, or swelling', 'Ask about numbness or pain', 'Document and refer concerning findings'],
              explanation: 'A consistent foot check helps detect problems early and supports timely referral.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'healthcare-english-tuberculosis-prevention',
    title: 'Tuberculosis Screening and Prevention',
    description: 'Understand TB transmission, screening protocols, infection control practices, and prevention strategies.',
    category: 'Infectious Disease',
    language: 'English',
    level: 'beginner',
    thumbnailUrl: '/images/turerculosos.png',
    totalEnrollments: 241,
    modules: [
      {
        id: 'tb-module-1',
        title: 'TB Basics',
        description: 'Learn how tuberculosis spreads and affects the body.',
        order: 1,
        topics: [
          {
            id: 'tb-topic-1',
            title: 'Understanding Tuberculosis',
            contentType: 'text',
            durationMinutes: 10,
            textContent: 'Tuberculosis is a bacterial infection caused by Mycobacterium tuberculosis and primarily affects the lungs.'
          },
          {
            id: 'tb-topic-2',
            title: 'Modes of Transmission',
            contentType: 'interactive',
            durationMinutes: 8,
            textContent: 'TB spreads through airborne droplets released when an infected person coughs or sneezes.'
          },
          {
            id: 'tb-topic-flipcard',
            title: 'Exercise',
            contentType: 'flipcard',
            durationMinutes: 5,
            textContent: 'Flip the cards to test your understanding of tuberculosis terms.',
            flashcards: [
              { front: 'What organism causes tuberculosis?', back: 'Mycobacterium tuberculosis, a bacterium that primarily targets the lungs.' },
              { front: 'How is tuberculosis transmitted?', back: 'Airborne transmission via tiny droplets released when an active TB patient coughs or sneezes.' },
              { front: 'What is the difference between Latent TB and Active TB?', back: 'Latent TB has no symptoms and is not contagious, whereas Active TB causes illness and spreads to others.' },
              { front: 'What are three common symptoms of active pulmonary TB?', back: 'A persistent cough lasting 3+ weeks, chest pain, and coughing up blood.' },
              { front: 'What is the standard screening tool for TB exposure?', back: 'The Mantoux Tuberculin Skin Test (TST) or Interferon-Gamma Release Assay (IGRA) blood test.' },
              { front: 'Why is treatment adherence critical for active TB?', back: 'To ensure complete cure and prevent the development of Multi-Drug Resistant TB (MDR-TB).' }
            ]
          }
        ],
        assessment: {
          id: 'tb-assessment-1',
          passingScore: 70,
          questions: [
            {
              text: 'TB primarily affects which organ?',
              options: ['Liver', 'Lungs', 'Heart'],
              correctOption: 1
            },
            {
              text: 'TB can spread through airborne droplets.',
              options: ['True', 'False'],
              correctOption: 0
            }
          ]
        }
      },
      {
        id: 'tb-module-2',
        title: 'Screening and Prevention',
        description: 'Identify high-risk individuals and implement preventive measures.',
        order: 2,
        topics: [
          {
            id: 'tb-topic-3',
            title: 'TB Screening Programs',
            contentType: 'text',
            durationMinutes: 12,
            textContent: 'Early detection helps reduce transmission and improve treatment outcomes.'
          },
          {
            id: 'tb-topic-mismatch',
            title: 'Exercise',
            contentType: 'mismatch',
            durationMinutes: 5,
            textContent: 'Match each TB screening tool or preventative measure with its correct description.',
            pairs: [
              { left: 'Infection Control', right: 'Wear N95 respirator mask' },
              { left: 'Sputum Test', right: 'Confirm active pulmonary TB' },
              { left: 'BCG Vaccine', right: 'Provide partial TB protection' },
              { left: 'Contact Tracing', right: 'Screen close family members' }
            ]
          }
        ],
        assessment: {
          id: 'tb-assessment-2',
          passingScore: 70,
          questions: [
            {
              text: 'Why is TB screening important?',
              options: ['Reduce transmission', 'Increase costs', 'Avoid treatment'],
              correctOption: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: 'healthcare-english-mental-health-first-response',
    title: 'Mental Health First Response',
    description: 'Support individuals experiencing emotional distress, anxiety, depression, and crisis situations through safe first-response techniques.',
    category: 'Mental Health',
    language: 'English',
    level: 'intermediate',
    thumbnailUrl: '/images/mental_health.png',
    totalEnrollments: 327,
    modules: [
      {
        id: 'mental-module-1',
        title: 'Recognizing Mental Health Concerns',
        description: 'Identify common mental health challenges and warning signs.',
        order: 1,
        topics: [
          {
            id: 'mental-topic-1',
            title: 'Understanding Anxiety and Depression',
            contentType: 'text',
            durationMinutes: 12,
            textContent: 'Anxiety and depression are common mental health conditions that can significantly impact daily functioning.'
          },
          {
            id: 'mental-topic-2',
            title: 'Recognizing Warning Signs',
            contentType: 'interactive',
            durationMinutes: 10,
            textContent: 'Learn to identify behavioral and emotional warning signs requiring support.'
          },
          {
            id: 'mental-topic-flipcard',
            title: 'Exercise',
            contentType: 'flipcard',
            durationMinutes: 5,
            textContent: 'Flip the cards to test your understanding of mental health terms.',
            flashcards: [
              { front: 'What is the primary role of a Mental Health First Responder?', back: 'To offer initial support, identify distress early, listen without judgment, and connect the individual to professional care.' },
              { front: 'Name two warning signs of acute distress.', back: 'Extreme mood shifts, social withdrawal, neglect of personal hygiene, and expressing feelings of hopelessness.' },
              { front: 'What is the key goal of active listening?', back: 'To show empathy, understand the person\'s feelings, and build trust without attempting to diagnose or fix the issue immediately.' },
              { front: 'How does panic present physically?', back: 'Shortness of breath, rapid heart rate, sweating, dizziness, and a feeling of losing control.' },
              { front: 'What should you do in a suicidal crisis?', back: 'Stay calm, do not leave the person alone, ask directly about their intent, and call emergency services or a crisis helpline immediately.' },
              { front: 'Why is self-care critical for responders?', back: 'To prevent emotional burnout, secondary traumatic stress, and maintain the capacity to support others.' }
            ]
          }
        ],
        assessment: {
          id: 'mental-assessment-1',
          passingScore: 70,
          questions: [
            {
              text: 'Mental health concerns can affect physical health.',
              options: ['True', 'False'],
              correctOption: 0
            },
            {
              text: 'Which is a warning sign?',
              options: ['Social withdrawal', 'Improved concentration', 'Increased energy only'],
              correctOption: 0
            }
          ]
        }
      },
      {
        id: 'mental-module-2',
        title: 'Providing Initial Support',
        description: 'Learn supportive communication and referral practices.',
        order: 2,
        topics: [
          {
            id: 'mental-topic-3',
            title: 'Active Listening Skills',
            contentType: 'text',
            durationMinutes: 10,
            textContent: 'Active listening helps build trust and encourages individuals to seek help.'
          },
          {
            id: 'mental-topic-mismatch',
            title: 'Exercise',
            contentType: 'mismatch',
            durationMinutes: 5,
            textContent: 'Match each supportive communication technique with its correct goal or definition.',
            pairs: [
              { left: 'Empathy', right: 'Understand feelings without judging' },
              { left: 'Open Questions', right: 'Encourage sharing details' },
              { left: 'Referral', right: 'Connect to local counselor' },
              { left: 'Sustain', right: 'Encourage regular check-ins' }
            ]
          }
        ],
        assessment: {
          id: 'mental-assessment-2',
          passingScore: 70,
          questions: [
            {
              text: 'What is a key component of active listening?',
              options: ['Interrupting frequently', 'Empathy', 'Ignoring concerns'],
              correctOption: 1
            }
          ]
        }
      }
    ]
  },
  {
    id: 'healthcare-english-vaccination-cold-chain',
    title: 'Vaccination Safety and Cold Chain Management',
    description: 'Learn safe vaccine handling, storage requirements, cold chain monitoring, and immunization best practices.',
    category: 'Immunization',
    language: 'English',
    level: 'beginner',
    thumbnailUrl: '/images/vaccination_sefty.png',
    totalEnrollments: 295,
    modules: [
      {
        id: 'vaccine-module-1',
        title: 'Vaccine Storage and Handling',
        description: 'Maintain vaccine effectiveness through proper storage practices.',
        order: 1,
        topics: [
          {
            id: 'vaccine-topic-1',
            title: 'Cold Chain Fundamentals',
            contentType: 'text',
            durationMinutes: 10,
            textContent: 'Vaccines must be stored within recommended temperature ranges to remain effective.'
          },
          {
            id: 'vaccine-topic-2',
            title: 'Temperature Monitoring',
            contentType: 'interactive',
            durationMinutes: 8,
            textContent: 'Practice monitoring and recording vaccine storage temperatures.'
          },
          {
            id: 'vaccine-topic-flipcard',
            title: 'Exercise',
            contentType: 'flipcard',
            durationMinutes: 5,
            textContent: 'Flip the cards to test your understanding of vaccine handling terms.',
            flashcards: [
              { front: 'What is the "Cold Chain" in immunization?', back: 'A temperature-controlled supply chain for storage and transport of vaccines from manufacture to use.' },
              { front: 'What is the ideal storage temperature for most refrigerated vaccines?', back: 'Between +2°C and +8°C (+36°F and +46°F).' },
              { front: 'Which vaccines are highly sensitive to freezing?', back: 'Tetanus, DPT, Hep B, and IPV vaccines lose all potency if frozen.' },
              { front: 'What does a Vaccine Vial Monitor (VVM) show?', back: 'A heat-sensitive label that indicates if a vaccine vial has been exposed to excessive heat over time.' },
              { front: 'How often should storage temperature logs be recorded?', back: 'Twice daily—once in the morning and once before leaving the clinic.' },
              { front: 'What is a "Shake Test" used for?', back: 'To check if a freeze-sensitive vaccine vial has been damaged by sub-zero temperatures.' }
            ]
          }
        ],
        assessment: {
          id: 'vaccine-assessment-1',
          passingScore: 70,
          questions: [
            {
              text: 'Why is cold chain management important?',
              options: ['Maintain vaccine effectiveness', 'Reduce packaging costs', 'Increase shelf size'],
              correctOption: 0
            },
            {
              text: 'Vaccines can be stored at any temperature.',
              options: ['True', 'False'],
              correctOption: 1
            }
          ]
        }
      },
      {
        id: 'vaccine-module-2',
        title: 'Safe Immunization Practices',
        description: 'Administer vaccines safely and manage adverse event reporting.',
        order: 2,
        topics: [
          {
            id: 'vaccine-topic-3',
            title: 'Injection Safety',
            contentType: 'text',
            durationMinutes: 12,
            textContent: 'Follow aseptic techniques and safety procedures during vaccine administration.'
          },
          {
            id: 'vaccine-topic-mismatch',
            title: 'Exercise',
            contentType: 'mismatch',
            durationMinutes: 5,
            textContent: 'Match each safe immunization practice or adverse condition with its correct protocol.',
            pairs: [
              { left: 'Aseptic Technique', right: 'Prevent clinic-acquired infections' },
              { left: 'Auto-Disable Needle', right: 'Prevent reuse of syringes' },
              { left: 'Anaphylaxis', right: 'Administer epinephrine immediately' },
              { left: 'Adverse Event', right: 'Document and report to safety registry' }
            ]
          }
        ],
        assessment: {
          id: 'vaccine-assessment-2',
          passingScore: 70,
          questions: [
            {
              text: 'Aseptic technique helps prevent:',
              options: ['Infection', 'Weather changes', 'Scheduling issues'],
              correctOption: 0
            }
          ]
        }
      }
    ]
  },
  {
    id: 'healthcare-english-patient-safety',
    title: 'Patient Safety Essentials',
    description: 'A practical foundation for reducing risk, improving bedside communication, and creating safer care routines.',
    category: 'Patient Care',
    language: 'English',
    level: 'beginner',
    thumbnailUrl: '/images/patient_sefety.png',
    totalEnrollments: 248,
    modules: [
      {
        id: 'safety-module-1',
        title: 'Safety Culture in Care Teams',
        description: 'Understand reporting habits, handoffs, and small checks that prevent avoidable errors.',
        order: 1,
        topics: [
          {
            id: 'safety-topic-1',
            title: 'What makes a safe care environment?',
            contentType: 'text',
            durationMinutes: 8,
            textContent: 'Patient safety begins with reliable routines: identify the patient, verify the care plan, confirm allergies, and speak up early when something feels wrong.',
          },
          {
            id: 'safety-topic-2',
            title: 'SBAR handoff practice',
            contentType: 'interactive',
            durationMinutes: 12,
            textContent: 'Practice structuring a clinical handoff with Situation, Background, Assessment, and Recommendation.',
          },
          {
            id: 'safety-topic-flipcard',
            title: 'Exercise',
            contentType: 'flipcard',
            durationMinutes: 5,
            textContent: 'Flip the cards to test your understanding of patient safety terms.',
            flashcards: [
              { front: 'What does SBAR stand for?', back: 'Situation, Background, Assessment, and Recommendation.' },
              { front: 'Why are two patient identifiers required before giving medication?', back: 'To prevent administration errors and ensure the right patient receives the right treatment.' },
              { front: 'What is a "Time-Out" in surgical safety?', back: 'A pause before a procedure starts to verify the right patient, right site, and right procedure.' },
              { front: 'What is the primary cause of clinical errors?', back: 'Communication breakdown during shift handoffs or patient transfers.' },
              { front: 'What is "Just Culture" in patient safety?', back: 'An environment that encourages reporting errors to improve safety processes, rather than punishing individuals.' },
              { front: 'Name three of the "Five Rights" of medication safety.', back: 'Right Patient, Right Drug, Right Dose, Right Route, and Right Time.' }
            ]
          }
        ],
        assessment: {
          id: 'safety-assessment-1',
          passingScore: 70,
          questions: [
            { text: 'What is the main purpose of SBAR?', options: ['Billing', 'Structured communication', 'Scheduling'], correctOption: 1 },
            { text: 'When should a safety concern be raised?', options: ['At the end of shift only', 'As early as possible', 'Only after harm occurs'], correctOption: 1 },
          ],
        },
      },
      {
        id: 'safety-module-2',
        title: 'Medication Safety Checks',
        description: 'Apply simple checks before administration and documentation.',
        order: 2,
        topics: [
          {
            id: 'safety-topic-3',
            title: 'The five rights of medication',
            contentType: 'text',
            durationMinutes: 10,
            textContent: 'Confirm the right patient, right medication, right dose, right route, and right time before administration.',
          },
          {
            id: 'safety-topic-mismatch',
            title: 'Exercise',
            contentType: 'mismatch',
            durationMinutes: 5,
            textContent: 'Match each of the "Rights of Medication Safety" with its correct clinical verification step.',
            pairs: [
              { left: 'Right Patient', right: 'Check two identifiers (Name, DOB)' },
              { left: 'Right Route', right: 'Confirm oral vs. intravenous delivery' },
              { left: 'Right Time', right: 'Administer at the exact scheduled hour' },
              { left: 'Right Dose', right: 'Verify concentration and volume' }
            ]
          }
        ],
        assessment: {
          id: 'safety-assessment-2',
          passingScore: 70,
          questions: [
            { text: 'Which is part of medication safety?', options: ['Right patient', 'Right parking', 'Right chair'], correctOption: 0 },
          ],
        },
      },
    ],
  },
  {
    id: 'healthcare-hindi-infection-prevention',
    title: 'क्लिनिक के लिए संक्रमण रोकथाम',
    description: 'स्वच्छता, PPE, सफाई क्षेत्र और संक्रमण नियंत्रण के व्यावहारिक निर्णयों पर स्टाफ को प्रशिक्षित करें।',
    category: 'संक्रमण नियंत्रण',
    language: 'Hindi',
    level: 'beginner',
    thumbnailUrl: '/images/roktham.png',
    totalEnrollments: 193,
    modules: [
      {
        id: 'infection-module-1',
        title: 'हाथों की स्वच्छता और PPE',
        description: 'हाथों की स्वच्छता के महत्वपूर्ण समय और सुरक्षा उपकरणों का सही उपयोग सीखें।',
        order: 1,
        topics: [
          {
            id: 'infection-topic-1',
            title: 'हाथ साफ करने के महत्वपूर्ण समय',
            contentType: 'text',
            durationMinutes: 9,
            textContent: 'मरीज को छूने से पहले, aseptic कार्य से पहले, शरीर के तरल पदार्थ के संपर्क के बाद, मरीज को छूने के बाद और मरीज के आसपास की चीजों को छूने के बाद हाथ साफ करें।',
          },
          {
            id: 'infection-topic-2',
            title: 'PPE चयन अभ्यास',
            contentType: 'interactive',
            durationMinutes: 11,
            textContent: 'जोखिम के आधार पर दस्ताने, मास्क, आंखों की सुरक्षा और गाउन का सही चयन करें।',
          },
          {
            id: 'infection-topic-flipcard',
            title: 'अभ्यास',
            contentType: 'flipcard',
            durationMinutes: 5,
            textContent: 'संक्रमण नियंत्रण की शर्तों के बारे में अपनी समझ का परीक्षण करने के लिए कार्डों को पलटें।',
            flashcards: [
              { front: 'हाथों की स्वच्छता के लिए 5 मुख्य अवसर क्या हैं?', back: 'मरीज से मिलने से पहले/बाद, साफ काम करने से पहले, तरल पदार्थ छूने के बाद, और आसपास छूने के बाद।' },
              { front: 'PPE का पूरा नाम क्या है?', back: 'पर्सनल प्रोटेक्टिव इक्विपमेंट (Personal Protective Equipment) - जैसे दस्ताने, मास्क और गाउन।' },
              { front: 'Aseptic तकनीक का क्या उद्देश्य है?', back: 'मेडिकल प्रक्रियाओं के दौरान कीटाणुओं के प्रवेश को रोकना और संक्रमण से बचाना।' },
              { front: 'दूषित सुइयों को नष्ट करने का सुरक्षित तरीका क्या है?', back: 'उन्हें तुरंत पास में रखे शार्प कंटेनर (Sharp Container) में डालना, कभी भी दोबारा कैप न लगाना।' },
              { front: 'चिकित्सा गाउन उतारने का सही क्रम क्या है?', back: 'गाउन और दस्ताने उतारें, हाथ साफ करें, फिर मास्क उतारें और दोबारा हाथ साफ करें।' },
              { front: 'जैविक कचरे के लिए लाल बैग (Red Bag) में क्या जाता है?', back: 'प्लास्टिक की नलियां, बोतलें, दस्ताने और अन्य पुनर्चक्रण योग्य (recyclable) दूषित सामग्री।' }
            ]
          }
        ],
        assessment: {
          id: 'infection-assessment-1',
          passingScore: 70,
          questions: [
            { text: 'Aseptic कार्य से पहले हाथों की स्वच्छता जरूरी है।', options: ['सही', 'गलत'], correctOption: 0 },
            { text: 'PPE का चयन exposure risk पर निर्भर करता है।', options: ['सही', 'गलत'], correctOption: 0 },
          ],
        },
      },
    ],
  },
  {
    id: 'healthcare-gujarati-emergency-response',
    title: 'ઇમરજન્સી પ્રતિસાદની મૂળભૂત બાબતો',
    description: 'પ્રથમ પ્રતિસાદ, escalation અને emergency documentation માટે checklist આધારિત શાંત તાલીમ.',
    category: 'ઇમરજન્સી કેર',
    language: 'Gujarati',
    level: 'intermediate',
    thumbnailUrl: '/images/gujrati.png',
    totalEnrollments: 176,
    modules: [
      {
        id: 'emergency-module-1',
        title: 'પ્રથમ પાંચ મિનિટ',
        description: 'સ્થળની સલામતી, vital signs, escalation અને ભૂમિકાની સ્પષ્ટતાને પ્રાથમિકતા આપો.',
        order: 1,
        topics: [
          {
            id: 'emergency-topic-1',
            title: 'ABCDE પ્રથમ પ્રતિસાદ',
            contentType: 'text',
            durationMinutes: 12,
            textContent: 'Airway, breathing, circulation, disability અને exposureનું મૂલ્યાંકન કરો. વહેલી મદદ બોલાવો અને મહત્વના સમયની નોંધ કરો.',
          },
          {
            id: 'emergency-topic-2',
            title: 'Escalation નિર્ણય અભ્યાસ',
            contentType: 'interactive',
            durationMinutes: 10,
            textContent: 'ચેતવણીના લક્ષણો આધારે senior clinician અથવા emergency transfer માટે ક્યારે escalate કરવું તે નક્કી કરો.',
          },
          {
            id: 'emergency-topic-flipcard',
            title: 'અભ્યાસ',
            contentType: 'flipcard',
            durationMinutes: 5,
            textContent: 'કટોકટીના શબ્દો વિશેની તમારી સમજણ ચકાસવા માટે કાર્ડ્સ ફ્લિપ કરો.',
            flashcards: [
              { front: 'ABCDE તપાસ પદ્ધતિ શું છે?', back: 'Airway (શ્વાસનળી), Breathing (શ્વાસોચ્છવાસ), Circulation (રુધિરાભિસરણ), Disability (અક્ષમતા), Exposure (દર્દીની સ્થિતિ).' },
              { front: 'કટોકટીમાં "પ્રથમ પાંચ મિનિટ" કેમ મહત્વપૂર્ણ છે?', back: 'આ સમયગાળામાં લીધેલા ત્વરિત નિર્ણયો દર્દીનો જીવ બચાવી શકે છે અને ગંભીર જોખમ ઘટાડે છે.' },
              { front: 'એરવે (Airway) અવરોધાયેલ છે તે કેવી રીતે ઓળખાય?', back: 'દર્દીનો અવાજ ન નીકળવો, અસામાન્ય અવાજ સાથે શ્વાસ લેવો અથવા ગૂંગળામણના સંકેતો દેખાવા.' },
              { front: 'કટોકટીમાં કોમ્યુનિકેશન માટે કયું સાધન વપરાય છે?', back: 'SBAR પદ્ધતિ (પરિસ્થિતિ, પૃષ્ઠભૂમિ, આકારણી, ભલામણ) જે ટૂંકી અને સ્પષ્ટ માહિતી આપે છે.' },
              { front: 'શોક (Shock) ના લક્ષણો કયા છે?', back: 'અવયવોમાં રક્ત પુરવઠો ઘટવો, ચામડી ફિક્કી પડવી, નબળો પલ્સ અને ગભરામણ થવી.' },
              { front: 'ઇમરજન્સીમાં ક્લિનિશિયનને ક્યારે રિફર કરવા?', back: 'જ્યારે વાઇટલ સાઇન્સ અનિયંત્રિત હોય અને પ્રાથમિક સારવારથી સુધારો ન થાય ત્યારે તુરંત એસ્કેલેટ કરવું.' }
            ]
          }
        ],
        assessment: {
          id: 'emergency-assessment-1',
          passingScore: 70,
          questions: [
            { text: 'ABCDEમાં પ્રથમ શું આવે છે?', options: ['Airway', 'Documentation', 'Discharge'], correctOption: 0 },
            { text: 'Emergency escalation paperwork પૂર્ણ થાય ત્યાં સુધી અટકાવવું જોઈએ.', options: ['સાચું', 'ખોટું'], correctOption: 1 },
          ],
        },
      },
    ],
  },
  {
    id: 'healthcare-english-digital-records',
    title: 'Digital Health Records Workflow',
    description: 'Help clinical teams capture clean, compliant, and searchable patient records.',
    category: 'Digital Health',
    language: 'English',
    level: 'intermediate',
    thumbnailUrl: '/images/digital_health.png',
    totalEnrollments: 211,
    modules: [
      {
        id: 'ehr-module-1',
        title: 'Clean Clinical Documentation',
        description: 'Structure notes, avoid duplicate entries, and record consent-sensitive information.',
        order: 1,
        topics: [
          {
            id: 'ehr-topic-1',
            title: 'SOAP note structure',
            contentType: 'text',
            durationMinutes: 10,
            textContent: 'SOAP notes organize subjective information, objective findings, assessment, and plan so care teams can quickly understand patient status.',
          },
          {
            id: 'ehr-topic-2',
            title: 'Data privacy checkpoints',
            contentType: 'text',
            durationMinutes: 8,
            textContent: 'Access only records needed for care, avoid sharing credentials, and log out from shared devices.',
          },
          {
            id: 'ehr-topic-flipcard',
            title: 'Exercise',
            contentType: 'flipcard',
            durationMinutes: 5,
            textContent: 'Flip the cards to test your understanding of digital records terms.',
            flashcards: [
              { front: 'What does SOAP stand for in documentation?', back: 'Subjective, Objective, Assessment, and Plan.' },
              { front: 'What goes under the Subjective (S) section of SOAP?', back: 'Symptoms, feelings, and details reported by the patient or their family.' },
              { front: 'What goes under the Objective (O) section of SOAP?', back: 'Measurable data collected by the provider (vital signs, lab results, exam findings).' },
              { front: 'Why is duplicate record entry a safety risk?', back: 'It causes fragmented histories, duplicate medication orders, and outdated lab values.' },
              { front: 'What is a secure password policy in EHR access?', back: 'Using complex characters, changing them regularly, and never writing passwords down or sharing credentials.' },
              { front: 'How do electronic alerts help clinical safety?', back: 'They warn providers about drug allergies, toxic interactions, and critical lab values automatically.' }
            ]
          }
        ],
        assessment: {
          id: 'ehr-assessment-1',
          passingScore: 70,
          questions: [
            { text: 'What does P stand for in SOAP?', options: ['Plan', 'Payment', 'Patient ID'], correctOption: 0 },
            { text: 'Sharing login credentials is acceptable in busy clinics.', options: ['True', 'False'], correctOption: 1 },
          ],
        },
      },
    ],
  },
  {
    id: 'healthcare-hindi-maternal-care',
    title: 'मातृ देखभाल तैयारी',
    description: 'Antenatal जांच, खतरे के संकेत, referral readiness और सम्मानजनक देखभाल के लिए frontline staff को तैयार करें।',
    category: 'मातृ स्वास्थ्य',
    language: 'Hindi',
    level: 'beginner',
    thumbnailUrl: '/images/mother_care.png',
    totalEnrollments: 164,
    modules: [
      {
        id: 'maternal-module-1',
        title: 'Antenatal visit की आवश्यक बातें',
        description: 'Routine checks और उन danger signs को पहचानें जिन्हें समय पर escalate करना जरूरी है।',
        order: 1,
        topics: [
          {
            id: 'maternal-topic-1',
            title: 'Routine antenatal screening',
            contentType: 'text',
            durationMinutes: 11,
            textContent: 'एक पूरी visit में history, blood pressure, danger sign review, nutrition counseling और follow-up planning शामिल होती है।',
          },
          {
            id: 'maternal-topic-2',
            title: 'Referral readiness checklist',
            contentType: 'interactive',
            durationMinutes: 9,
            textContent: 'Transport, documentation, family communication और receiving facility coordination की जांच करें।',
          },
          {
            id: 'maternal-topic-flipcard',
            title: 'अभ्यास',
            contentType: 'flipcard',
            durationMinutes: 5,
            textContent: 'मातृ स्वास्थ्य के महत्वपूर्ण नियमों के बारे में अपनी समझ का परीक्षण करने के लिए कार्डों को पलटें।',
            flashcards: [
              { front: 'प्रसव पूर्व (Antenatal) जांच कब शुरू होनी चाहिए?', back: 'गर्भधारण का पता चलते ही पहले तीन महीनों के भीतर पहली जांच आवश्यक है।' },
              { front: 'गर्भावस्था में उच्च रक्तचाप (High BP) का क्या खतरा है?', back: 'यह प्री-एक्लेम्पसिया (Pre-eclampsia) का संकेत हो सकता है, जिससे मां और बच्चे दोनों को खतरा होता है।' },
              { front: 'प्रसव पूर्व देखभाल में आयरन-फॉलिक एसिड (IFA) का क्या महत्व है?', back: 'यह गर्भवती महिला में एनीमिया (खून की कमी) को रोकता है और बच्चे के मानसिक विकास में मदद करता है।' },
              { front: 'प्रसव पूर्व खतरे के तीन लक्षण क्या हैं?', back: 'अत्यधिक रक्तस्राव, तेज सिरदर्द और धुंधला दिखना, तथा पैरों और चेहरे पर अचानक सूजन।' },
              { front: 'रेफरल तैयारी (Referral Readiness) में क्या शामिल है?', back: 'पहले से तय वाहन, आपातकालीन संपर्क नंबर, मेडिकल इतिहास का कार्ड और परिवार में रक्तदाता की पहचान।' },
              { front: 'प्रसव कक्ष (Labor Room) में संक्रमण नियंत्रण का मुख्य नियम क्या है?', back: 'प्रसव से पहले पांच साफ नियमों (साफ हाथ, साफ सतह, साफ धागा, साफ ब्लेड, साफ नाभि पट्टी) का पालन करना।' }
            ]
          }
        ],
        assessment: {
          id: 'maternal-assessment-1',
          passingScore: 70,
          questions: [
            { text: 'गर्भावस्था में high blood pressure danger sign हो सकता है।', options: ['सही', 'गलत'], correctOption: 0 },
            { text: 'Referral planning में transport और documentation शामिल होते हैं।', options: ['सही', 'गलत'], correctOption: 0 },
          ],
        },
      },
    ],
  },


];

export function withCourseTotals(course) {
  const modules = course.modules.map((module) => ({
    ...module,
    topics: module.topics.map((topic) => ({
      ...topic,
      videoUrl: topic.videoUrl || DEFAULT_SECTION_VIDEO_URL,
    })),
  }));
  const totalModules = modules.length;
  const totalTopics = modules.reduce((sum, module) => sum + module.topics.length, 0);
  return {
    ...course,
    instructor: course.instructor || getDefaultInstructor(course),
    modules,
    totalModules,
    totalTopics,
  };
}

export function listCourses() {
  return courses.map(withCourseTotals);
}

export function getCourse(id) {
  const course = courses.find((item) => item.id === id);
  return course ? withCourseTotals(course) : null;
}

export function buildLearningModules(course) {
  if (!course) return [];

  const contentModules = course.modules.map((module) => ({
    ...module,
    kind: 'content',
    sections: module.topics.map((topic) => ({
      ...topic,
      videoUrl: topic.videoUrl || DEFAULT_SECTION_VIDEO_URL,
      moduleId: module.id,
      sectionId: topic.id,
      sectionType: 'content',
    })),
  }));

  const assessmentSections = course.modules.flatMap((module) => (
    module.assessment?.questions || []
  ).map((question, index) => ({
    id: `${module.assessment.id}-question-${index + 1}`,
    sectionId: `${module.assessment.id}-question-${index + 1}`,
    moduleId: `${course.id}-final-assessment`,
    assessmentId: module.assessment.id,
    title: `${module.title} - Question ${index + 1}`,
    contentType: 'assessment',
    sectionType: 'assessment',
    durationMinutes: 4,
    question: {
      id: `${module.assessment.id}-question-${index + 1}`,
      type: question.type || inferQuestionType(question),
      question: question.text || question.question,
      options: question.options || [],
      pairs: question.pairs || [],
      choices: question.choices || [],
      items: question.items || [],
      scenario: question.scenario || '',
      correctAnswer: normalizeCorrectAnswer(question),
      explanation: question.explanation || 'Review the healthcare protocol and choose the safest evidence-based option.',
    },
  })));

  return [
    ...contentModules,
    {
      id: `${course.id}-final-assessment`,
      title: 'Final Assessment Module',
      description: 'Complete assessment sections after finishing all learning content.',
      order: contentModules.length + 1,
      kind: 'assessment',
      sections: assessmentSections,
    },
  ];
}

function inferQuestionType(question) {
  if (question.type) return question.type;
  if ((question.options || []).length === 2 && question.options.every((option) => ['True', 'False', 'सही', 'गलत', 'સાચું', 'ખોટું'].includes(option))) {
    return 'true-false';
  }
  return 'single-choice';
}

function normalizeCorrectAnswer(question) {
  if (question.correctAnswer !== undefined) return question.correctAnswer;
  if (Array.isArray(question.correctOptions)) return question.correctOptions;
  if (typeof question.correctOption === 'number') return question.options?.[question.correctOption] ?? question.correctOption;
  return question.correctOption;
}

function getDefaultInstructor(course) {
  if (course.language === 'Hindi') {
    return {
      name: 'Dr. Asha Mehra',
      role: 'Community Health Training Lead',
      specialty: course.category,
      experience: '11+ years',
      learners: '18k+',
      rating: '4.8',
      bio: 'Designs practical healthcare training for frontline teams, with a focus on safe routines, patient communication, and clinic-ready workflows.',
      initials: 'AM',
    };
  }

  if (course.language === 'Gujarati') {
    return {
      name: 'Dr. Meera Shah',
      role: 'Emergency Care Educator',
      specialty: course.category,
      experience: '13+ years',
      learners: '14k+',
      rating: '4.9',
      bio: 'Works with care teams on rapid assessment, escalation decisions, and clear documentation during high-pressure clinical moments.',
      initials: 'MS',
    };
  }

  const englishInstructors = {
    'Chronic Disease Management': {
      name: 'Dr. Priya Nair',
      role: 'Diabetes Care Specialist',
      specialty: 'Chronic disease education',
      experience: '12+ years',
      learners: '22k+',
      rating: '4.9',
      bio: 'Helps care teams translate diabetes protocols into simple patient education, monitoring routines, and safer follow-up practices.',
      initials: 'PN',
    },
    'Infectious Disease': {
      name: 'Dr. Omar Khan',
      role: 'Infection Prevention Consultant',
      specialty: 'TB screening and prevention',
      experience: '15+ years',
      learners: '19k+',
      rating: '4.8',
      bio: 'Trains clinic teams on screening workflows, airborne precautions, and prevention habits that reduce infection risk.',
      initials: 'OK',
    },
    'Mental Health': {
      name: 'Dr. Leah Thomas',
      role: 'Mental Health First Response Coach',
      specialty: 'Crisis communication',
      experience: '10+ years',
      learners: '16k+',
      rating: '4.9',
      bio: 'Builds calm, practical first-response skills for recognizing distress, listening safely, and connecting learners to appropriate support.',
      initials: 'LT',
    },
    Immunization: {
      name: 'Dr. Kavita Rao',
      role: 'Immunization Program Trainer',
      specialty: 'Cold chain management',
      experience: '14+ years',
      learners: '21k+',
      rating: '4.8',
      bio: 'Supports vaccination teams with storage, handling, injection safety, and adverse event reporting practices.',
      initials: 'KR',
    },
    'Patient Care': {
      name: 'Dr. Elena Morris',
      role: 'Patient Safety Facilitator',
      specialty: 'Medication and handoff safety',
      experience: '12+ years',
      learners: '17k+',
      rating: '4.9',
      bio: 'Teaches small, repeatable safety checks that improve communication and reduce preventable care errors.',
      initials: 'EM',
    },
    'Digital Health': {
      name: 'Dr. Sameer Iqbal',
      role: 'Digital Health Workflow Lead',
      specialty: 'Clinical documentation',
      experience: '9+ years',
      learners: '12k+',
      rating: '4.7',
      bio: 'Helps teams create cleaner digital records while protecting privacy and keeping daily documentation realistic.',
      initials: 'SI',
    },
  };

  return englishInstructors[course.category] || {
    name: 'Dr. Maya Chen',
    role: 'Healthcare Learning Specialist',
    specialty: course.category,
    experience: '10+ years',
    learners: '15k+',
    rating: '4.8',
    bio: 'Creates practical healthcare learning paths focused on safe decisions, clear communication, and applied clinical workflows.',
    initials: 'MC',
  };
}
