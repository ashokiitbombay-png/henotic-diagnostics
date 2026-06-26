// Medical Conditions Configuration for Henotic Diagnostics PSEO Platform
// Maps 85+ real-world medical conditions to recommended diagnostic services

export interface MedicalCondition {
  id: string; // URL slug
  title: string;
  description: string;
  symptoms: string[];
  recommendedServices: string[]; // service slugs from services.ts
  urgencyLevel: "routine" | "moderate" | "urgent";
  bodySystem: string;
}

export const CONDITIONS: MedicalCondition[] = [
  // ─────────────────────────────────────────────
  // MUSCULOSKELETAL & PAIN CONDITIONS
  // ─────────────────────────────────────────────
  {
    id: "back-pain",
    title: "Back Pain",
    description:
      "Persistent or acute back pain that may indicate disc herniation, spinal stenosis, spondylosis, muscle strain, or vertebral fracture requiring imaging evaluation.",
    symptoms: [
      "Lower back pain",
      "Upper back pain",
      "Pain radiating to legs",
      "Stiffness in spine",
      "Difficulty bending or standing",
      "Muscle spasms",
    ],
    recommendedServices: [
      "mri-spine",
      "lumbar-spine-mri",
      "ct-spine",
      "dexa-bone-scan",
      "musculoskeletal-ultrasound",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "knee-pain",
    title: "Knee Pain",
    description:
      "Knee pain from injury, osteoarthritis, meniscus tear, ligament damage, or inflammatory conditions. MRI and ultrasound help identify the underlying structural cause.",
    symptoms: [
      "Knee swelling",
      "Pain while walking or climbing stairs",
      "Knee locking or giving way",
      "Reduced range of motion",
      "Crepitus or grinding sound",
    ],
    recommendedServices: [
      "mri-knee",
      "knee-mri",
      "musculoskeletal-ultrasound",
      "dexa-bone-scan",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "joint-pain",
    title: "Joint Pain",
    description:
      "Multi-joint or single-joint pain due to arthritis, gout, autoimmune conditions, or wear-and-tear degeneration requiring blood work and imaging.",
    symptoms: [
      "Joint swelling",
      "Morning stiffness",
      "Redness and warmth over joints",
      "Restricted movement",
      "Pain worsening with activity",
    ],
    recommendedServices: [
      "mri-joint",
      "musculoskeletal-ultrasound",
      "blood-test",
      "dexa-bone-scan",
      "cbc-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "neck-pain",
    title: "Neck Pain",
    description:
      "Cervical pain from spondylosis, disc prolapse, muscle strain, nerve compression, or postural issues. MRI of the cervical spine is the gold standard for evaluation.",
    symptoms: [
      "Neck stiffness",
      "Pain radiating to arms",
      "Numbness in hands",
      "Headache originating from neck",
      "Difficulty turning head",
    ],
    recommendedServices: [
      "cervical-spine-mri",
      "mri-neck",
      "ct-spine",
      "neck-ultrasound",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "shoulder-pain",
    title: "Shoulder Pain",
    description:
      "Shoulder pain from rotator cuff injury, frozen shoulder, impingement syndrome, or labral tear. MRI and ultrasound provide detailed evaluation of soft tissue structures.",
    symptoms: [
      "Shoulder pain at night",
      "Difficulty raising arm",
      "Weakness in shoulder",
      "Pain reaching behind back",
      "Clicking or popping sensation",
    ],
    recommendedServices: [
      "mri-shoulder",
      "shoulder-mri",
      "musculoskeletal-ultrasound",
      "soft-tissue-ultrasound",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "hip-pain",
    title: "Hip Pain",
    description:
      "Hip pain from osteoarthritis, avascular necrosis, labral tear, bursitis, or stress fracture. MRI is essential for accurate soft-tissue and bone marrow evaluation.",
    symptoms: [
      "Groin pain",
      "Difficulty walking",
      "Pain sitting cross-legged",
      "Limping",
      "Reduced hip range of motion",
    ],
    recommendedServices: [
      "mri-hip",
      "pelvis-mri",
      "dexa-bone-scan",
      "musculoskeletal-ultrasound",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "ankle-pain",
    title: "Ankle Pain",
    description:
      "Ankle pain following injury, chronic instability, tendinopathy, or stress fractures. MRI detects ligament, tendon, and cartilage damage not visible on X-ray.",
    symptoms: [
      "Ankle swelling",
      "Pain while walking",
      "Instability or giving way",
      "Bruising around ankle",
      "Stiffness in morning",
    ],
    recommendedServices: [
      "mri-ankle",
      "mri-foot",
      "musculoskeletal-ultrasound",
      "soft-tissue-ultrasound",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "bone-fracture",
    title: "Bone Fracture",
    description:
      "Suspected or known bone fracture from trauma, stress injury, or pathological causes. CT and MRI detect occult fractures missed on plain X-ray.",
    symptoms: [
      "Severe localized pain",
      "Swelling and bruising",
      "Deformity of limb",
      "Inability to bear weight",
      "Pain with movement",
    ],
    recommendedServices: [
      "ct-scan",
      "mri-joint",
      "dexa-bone-scan",
      "musculoskeletal-ultrasound",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "sports-injury",
    title: "Sports Injury",
    description:
      "Athletic injuries affecting muscles, tendons, ligaments, and bones. MRI is critical for grading tears, planning treatment, and assessing return-to-sport readiness.",
    symptoms: [
      "Acute pain during activity",
      "Joint swelling",
      "Muscle weakness",
      "Reduced range of motion",
      "Bruising",
    ],
    recommendedServices: [
      "mri-joint",
      "mri-knee",
      "mri-shoulder",
      "musculoskeletal-ultrasound",
      "soft-tissue-ultrasound",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "ligament-tear",
    title: "Ligament Tear",
    description:
      "Partial or complete ligament tears (ACL, MCL, PCL) commonly affecting the knee and ankle. MRI is the definitive imaging modality for ligament evaluation.",
    symptoms: [
      "Popping sound at injury",
      "Rapid joint swelling",
      "Instability",
      "Pain with weight-bearing",
      "Joint giving way",
    ],
    recommendedServices: [
      "mri-knee",
      "knee-mri",
      "mri-ankle",
      "musculoskeletal-ultrasound",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "meniscus-tear",
    title: "Meniscus Tear",
    description:
      "Meniscal tears of the knee causing pain, swelling, and mechanical symptoms. MRI provides detailed visualization of meniscal integrity and associated injuries.",
    symptoms: [
      "Knee pain along joint line",
      "Knee locking",
      "Catching sensation",
      "Swelling after activity",
      "Difficulty squatting",
    ],
    recommendedServices: [
      "mri-knee",
      "knee-mri",
      "musculoskeletal-ultrasound",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "acl-tear",
    title: "ACL Tear",
    description:
      "Anterior cruciate ligament (ACL) injury commonly occurring during sports. MRI confirms the diagnosis, assesses associated injuries, and guides surgical planning.",
    symptoms: [
      "Loud pop at time of injury",
      "Immediate knee swelling",
      "Knee instability",
      "Inability to continue activity",
      "Pain with pivoting movements",
    ],
    recommendedServices: [
      "mri-knee",
      "knee-mri",
      "musculoskeletal-ultrasound",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "rotator-cuff-injury",
    title: "Rotator Cuff Injury",
    description:
      "Rotator cuff tears or tendinopathy causing shoulder pain and weakness. MRI and ultrasound are the primary imaging modalities to evaluate tear size and tendon quality.",
    symptoms: [
      "Shoulder pain at night",
      "Weakness lifting arm",
      "Pain reaching overhead",
      "Crackling sensation with movement",
      "Difficulty sleeping on affected side",
    ],
    recommendedServices: [
      "mri-shoulder",
      "shoulder-mri",
      "musculoskeletal-ultrasound",
      "soft-tissue-ultrasound",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "tennis-elbow",
    title: "Tennis Elbow",
    description:
      "Lateral epicondylitis causing pain on the outside of the elbow from repetitive forearm use. Ultrasound and MRI confirm the diagnosis and rule out other causes.",
    symptoms: [
      "Pain on outer elbow",
      "Weak grip strength",
      "Pain with wrist extension",
      "Difficulty turning doorknobs",
      "Pain lifting objects",
    ],
    recommendedServices: [
      "mri-elbow",
      "musculoskeletal-ultrasound",
      "soft-tissue-ultrasound",
    ],
    urgencyLevel: "routine",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "carpal-tunnel",
    title: "Carpal Tunnel Syndrome",
    description:
      "Compression of the median nerve at the wrist causing numbness and tingling in the hand. Ultrasound and MRI can visualize nerve swelling and guide treatment.",
    symptoms: [
      "Numbness in thumb and fingers",
      "Tingling in hand",
      "Hand weakness",
      "Dropping objects",
      "Symptoms worse at night",
    ],
    recommendedServices: [
      "mri-wrist",
      "mri-hand",
      "musculoskeletal-ultrasound",
      "soft-tissue-ultrasound",
    ],
    urgencyLevel: "routine",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "plantar-fasciitis",
    title: "Plantar Fasciitis",
    description:
      "Inflammation of the plantar fascia causing heel pain, especially with first steps in the morning. Ultrasound measures fascia thickness and MRI rules out stress fracture.",
    symptoms: [
      "Heel pain in the morning",
      "Pain after standing long periods",
      "Sharp stabbing heel pain",
      "Pain worsening over weeks",
      "Tenderness on heel bottom",
    ],
    recommendedServices: [
      "mri-foot",
      "mri-ankle",
      "musculoskeletal-ultrasound",
      "soft-tissue-ultrasound",
    ],
    urgencyLevel: "routine",
    bodySystem: "Musculoskeletal",
  },
  {
    id: "osteoporosis",
    title: "Osteoporosis",
    description:
      "Low bone density condition increasing fracture risk, commonly affecting postmenopausal women and elderly. DEXA scan is the gold standard for diagnosis and monitoring.",
    symptoms: [
      "No symptoms in early stages",
      "Back pain from compression fracture",
      "Loss of height over time",
      "Stooped posture",
      "Bone fracture from minor trauma",
    ],
    recommendedServices: [
      "dexa-bone-scan",
      "bone-density-test",
      "bmd-test",
      "osteoporosis-screening",
      "vitamin-d-test",
      "blood-test",
    ],
    urgencyLevel: "routine",
    bodySystem: "Musculoskeletal",
  },

  // ─────────────────────────────────────────────
  // SPINAL CONDITIONS
  // ─────────────────────────────────────────────
  {
    id: "spinal-disc-herniation",
    title: "Spinal Disc Herniation",
    description:
      "Herniated or bulging intervertebral disc causing nerve compression, radiculopathy, and back/leg pain. MRI is essential for localization and surgical planning.",
    symptoms: [
      "Severe back pain",
      "Pain radiating down the leg (sciatica)",
      "Numbness or tingling",
      "Muscle weakness",
      "Pain worsening with sitting or coughing",
    ],
    recommendedServices: [
      "lumbar-spine-mri",
      "cervical-spine-mri",
      "mri-spine",
      "whole-spine-mri",
      "ct-spine",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Spine",
  },
  {
    id: "sciatica",
    title: "Sciatica",
    description:
      "Pain radiating along the sciatic nerve from lower back to leg, usually caused by disc herniation or spinal stenosis. MRI identifies the exact level and cause of compression.",
    symptoms: [
      "Sharp pain from lower back to leg",
      "Burning or tingling in leg",
      "Weakness in leg or foot",
      "Pain worse when sitting",
      "Difficulty walking",
    ],
    recommendedServices: [
      "lumbar-spine-mri",
      "mri-spine",
      "ct-spine",
      "lower-limb-doppler",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Spine",
  },
  {
    id: "cervical-spondylosis",
    title: "Cervical Spondylosis",
    description:
      "Age-related degenerative changes in the cervical spine causing neck pain, stiffness, and potential nerve compression. MRI evaluates disc degeneration and spinal canal narrowing.",
    symptoms: [
      "Chronic neck pain",
      "Stiffness and reduced mobility",
      "Pain radiating to arms",
      "Numbness in hands",
      "Headaches from neck origin",
    ],
    recommendedServices: [
      "cervical-spine-mri",
      "mri-neck",
      "ct-spine",
      "mri-spine",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Spine",
  },
  {
    id: "lumbar-spondylosis",
    title: "Lumbar Spondylosis",
    description:
      "Degenerative disc disease and spondylotic changes in the lumbar spine causing chronic low back pain. MRI guides treatment decisions and identifies nerve compression.",
    symptoms: [
      "Chronic low back pain",
      "Stiffness after sitting",
      "Pain radiating to buttocks",
      "Difficulty bending forward",
      "Morning stiffness",
    ],
    recommendedServices: [
      "lumbar-spine-mri",
      "mri-spine",
      "whole-spine-mri",
      "ct-spine",
      "dexa-bone-scan",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Spine",
  },

  // ─────────────────────────────────────────────
  // CARDIOVASCULAR CONDITIONS
  // ─────────────────────────────────────────────
  {
    id: "chest-pain",
    title: "Chest Pain",
    description:
      "Chest pain requiring urgent cardiac evaluation to rule out heart disease, angina, or myocardial infarction. ECG, echocardiography, and cardiac CT are frontline investigations.",
    symptoms: [
      "Central or left chest pain",
      "Pain radiating to arm or jaw",
      "Chest tightness",
      "Shortness of breath",
      "Sweating with chest pain",
    ],
    recommendedServices: [
      "ecg",
      "2d-echo",
      "tmt-test",
      "cardiac-ct-scan",
      "coronary-ct-angiography",
      "cardiac-risk-assessment",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Cardiovascular",
  },
  {
    id: "high-blood-pressure",
    title: "High Blood Pressure",
    description:
      "Hypertension requiring comprehensive cardiovascular and renal evaluation. 24-hour ambulatory BP monitoring, ECG, echocardiography, and renal Doppler are key investigations.",
    symptoms: [
      "Often asymptomatic",
      "Headache",
      "Dizziness",
      "Blurred vision",
      "Nosebleeds",
      "Chest discomfort",
    ],
    recommendedServices: [
      "24-hour-bp-monitoring",
      "ambulatory-bp-monitoring",
      "ecg",
      "2d-echo",
      "renal-doppler",
      "kidney-function-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Cardiovascular",
  },
  {
    id: "heart-disease",
    title: "Heart Disease",
    description:
      "Suspected or known coronary artery disease, valvular heart disease, or cardiomyopathy requiring comprehensive cardiac evaluation including echocardiography and CT angiography.",
    symptoms: [
      "Chest pain on exertion",
      "Breathlessness",
      "Palpitations",
      "Fatigue on activity",
      "Swelling in legs",
      "Irregular heartbeat",
    ],
    recommendedServices: [
      "2d-echo",
      "ecg",
      "tmt-test",
      "coronary-ct-angiography",
      "cardiac-mri",
      "cardiac-screening",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Cardiovascular",
  },
  {
    id: "palpitations",
    title: "Palpitations",
    description:
      "Sensation of rapid, fluttering, or irregular heartbeat. Holter monitoring and ECG help identify arrhythmias and guide treatment decisions.",
    symptoms: [
      "Rapid heartbeat",
      "Skipped beats",
      "Fluttering sensation in chest",
      "Lightheadedness",
      "Anxiety with palpitations",
    ],
    recommendedServices: [
      "ecg",
      "holter-monitoring",
      "24-hour-holter",
      "2d-echo",
      "thyroid-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Cardiovascular",
  },
  {
    id: "high-cholesterol",
    title: "High Cholesterol",
    description:
      "Dyslipidemia and elevated cholesterol levels increasing cardiovascular risk. Lipid profile testing with cardiac risk assessment helps guide prevention strategies.",
    symptoms: [
      "Usually asymptomatic",
      "Xanthomas (fatty deposits under skin)",
      "Arcus cornealis (ring around cornea)",
      "Chest discomfort on exertion",
    ],
    recommendedServices: [
      "lipid-profile",
      "cardiac-risk-assessment",
      "cardiac-screening",
      "ecg",
      "blood-test",
    ],
    urgencyLevel: "routine",
    bodySystem: "Cardiovascular",
  },
  {
    id: "stroke-risk",
    title: "Stroke Risk Assessment",
    description:
      "Evaluation of stroke risk factors including carotid artery stenosis, atrial fibrillation, and cerebrovascular disease. Carotid Doppler and brain MRI are essential investigations.",
    symptoms: [
      "Family history of stroke",
      "High blood pressure",
      "Transient weakness or numbness",
      "Brief episodes of vision loss",
      "Slurred speech episodes",
    ],
    recommendedServices: [
      "carotid-doppler",
      "carotid-artery-doppler",
      "mri-brain",
      "mr-angiography",
      "ecg",
      "lipid-profile",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Cardiovascular",
  },
  {
    id: "deep-vein-thrombosis",
    title: "Deep Vein Thrombosis (DVT)",
    description:
      "Blood clot in deep veins, usually in the legs. Urgent Doppler ultrasound is required for diagnosis and to assess risk of pulmonary embolism.",
    symptoms: [
      "Leg swelling (usually one-sided)",
      "Calf pain and tenderness",
      "Warmth and redness in leg",
      "Visible superficial veins",
      "Pain worsening with walking",
    ],
    recommendedServices: [
      "deep-vein-thrombosis-scan",
      "dvt-doppler",
      "lower-limb-doppler",
      "venous-doppler",
      "ct-pulmonary-angiography",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Cardiovascular",
  },
  {
    id: "varicose-veins",
    title: "Varicose Veins",
    description:
      "Dilated, tortuous superficial veins in the legs due to venous valve incompetence. Venous Doppler maps reflux patterns and guides treatment planning.",
    symptoms: [
      "Visible bulging veins on legs",
      "Heaviness in legs",
      "Leg swelling toward evening",
      "Itching around veins",
      "Leg cramps at night",
    ],
    recommendedServices: [
      "venous-doppler",
      "venous-insufficiency-scan",
      "lower-limb-doppler",
      "vascular-doppler",
    ],
    urgencyLevel: "routine",
    bodySystem: "Cardiovascular",
  },
  {
    id: "peripheral-artery-disease",
    title: "Peripheral Artery Disease",
    description:
      "Narrowing of peripheral arteries reducing blood flow to the limbs. Arterial Doppler studies assess severity and guide revascularization decisions.",
    symptoms: [
      "Leg pain while walking (claudication)",
      "Cold feet or legs",
      "Weak pulses in feet",
      "Slow-healing wounds on feet",
      "Shiny skin on legs",
    ],
    recommendedServices: [
      "arterial-doppler",
      "peripheral-arterial-doppler",
      "lower-limb-doppler",
      "ct-angiography",
      "vascular-doppler",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Cardiovascular",
  },
  {
    id: "aortic-aneurysm",
    title: "Aortic Aneurysm",
    description:
      "Abnormal dilation of the aorta with risk of rupture. CT angiography and ultrasound are used for screening, measurement, and surveillance of known aneurysms.",
    symptoms: [
      "Often asymptomatic",
      "Pulsatile abdominal mass",
      "Back pain (if large)",
      "Deep abdominal pain",
      "Sudden severe pain (if rupturing)",
    ],
    recommendedServices: [
      "abdominal-ultrasound",
      "ct-angiography",
      "vascular-doppler",
      "ct-abdomen-pelvis",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Cardiovascular",
  },
  {
    id: "carotid-artery-disease",
    title: "Carotid Artery Disease",
    description:
      "Atherosclerotic narrowing of the carotid arteries increasing stroke risk. Carotid Doppler ultrasound is the primary screening and surveillance tool.",
    symptoms: [
      "Often asymptomatic until stroke",
      "Transient ischemic attack (TIA)",
      "Brief vision loss in one eye",
      "Dizziness",
      "Weakness on one side",
    ],
    recommendedServices: [
      "carotid-doppler",
      "carotid-artery-doppler",
      "mri-brain",
      "mr-angiography",
      "ct-angiography",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Cardiovascular",
  },
  {
    id: "chest-tightness",
    title: "Chest Tightness",
    description:
      "Sensation of pressure or tightness in the chest requiring cardiac and pulmonary evaluation to differentiate between cardiac, respiratory, and musculoskeletal causes.",
    symptoms: [
      "Pressure-like sensation in chest",
      "Difficulty taking deep breath",
      "Pain with exertion",
      "Associated anxiety",
      "Intermittent tightness",
    ],
    recommendedServices: [
      "ecg",
      "2d-echo",
      "hrct-chest",
      "tmt-test",
      "chest-ct-scan",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Cardiovascular",
  },

  // ─────────────────────────────────────────────
  // NEUROLOGICAL CONDITIONS
  // ─────────────────────────────────────────────
  {
    id: "headache",
    title: "Headache",
    description:
      "Chronic or severe headaches including migraine, tension-type, and secondary headaches. Brain MRI rules out structural causes such as tumors, aneurysms, and sinusitis.",
    symptoms: [
      "Severe or recurring headaches",
      "Headache with nausea",
      "Visual disturbances with headache",
      "Headache worse in morning",
      "New onset headache in adults",
    ],
    recommendedServices: [
      "mri-brain",
      "brain-mri",
      "ct-brain",
      "mri-paranasal-sinus",
      "mri-brain-screening",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Neurological",
  },
  {
    id: "dizziness",
    title: "Dizziness",
    description:
      "Vertigo, lightheadedness, or balance problems from inner ear, neurological, or vascular causes. Brain MRI and carotid Doppler help identify the underlying etiology.",
    symptoms: [
      "Spinning sensation (vertigo)",
      "Lightheadedness",
      "Unsteadiness while walking",
      "Nausea with dizziness",
      "Ringing in ears (tinnitus)",
    ],
    recommendedServices: [
      "mri-brain",
      "brain-mri",
      "carotid-doppler",
      "ecg",
      "blood-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Neurological",
  },
  {
    id: "numbness-tingling",
    title: "Numbness & Tingling",
    description:
      "Sensory symptoms of numbness, tingling, or pins-and-needles in extremities from nerve compression, neuropathy, or spinal cord pathology.",
    symptoms: [
      "Numbness in hands or feet",
      "Tingling (pins and needles)",
      "Burning sensation",
      "Loss of fine motor control",
      "Weakness in affected area",
    ],
    recommendedServices: [
      "mri-brain",
      "mri-spine",
      "cervical-spine-mri",
      "vitamin-b12-test",
      "blood-test",
      "hba1c-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Neurological",
  },
  {
    id: "brain-tumor-screening",
    title: "Brain Tumor Screening",
    description:
      "Investigation for suspected intracranial mass lesion. Contrast-enhanced MRI brain is the imaging modality of choice for detection and characterization.",
    symptoms: [
      "Persistent headache worsening over weeks",
      "Seizures (new onset)",
      "Vision changes",
      "Personality or behavior changes",
      "Progressive weakness",
      "Nausea and vomiting (especially morning)",
    ],
    recommendedServices: [
      "mri-brain",
      "brain-mri",
      "contrast-mri",
      "ct-brain",
      "mri-brain-screening",
      "pet-ct",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Neurological",
  },
  {
    id: "seizures",
    title: "Seizures",
    description:
      "New-onset or recurrent seizures requiring brain imaging to identify structural causes such as tumors, vascular malformations, or cortical dysplasia.",
    symptoms: [
      "Convulsions",
      "Loss of consciousness",
      "Staring spells",
      "Muscle jerking",
      "Confusion after episode",
      "Tongue biting",
    ],
    recommendedServices: [
      "mri-brain",
      "brain-mri",
      "ct-brain",
      "contrast-mri",
      "ecg",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Neurological",
  },
  {
    id: "memory-loss",
    title: "Memory Loss",
    description:
      "Progressive cognitive decline or memory impairment requiring neuroimaging and metabolic evaluation to identify treatable causes and assess for dementia.",
    symptoms: [
      "Forgetting recent events",
      "Difficulty finding words",
      "Confusion in familiar places",
      "Difficulty with daily tasks",
      "Repeating questions",
    ],
    recommendedServices: [
      "mri-brain",
      "brain-mri",
      "neurology-pet-ct",
      "thyroid-test",
      "vitamin-b12-test",
      "blood-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Neurological",
  },
  {
    id: "parkinsons-screening",
    title: "Parkinson's Disease Screening",
    description:
      "Evaluation for tremor and movement disorders suggestive of Parkinson's disease. Brain MRI and specialized PET CT help differentiate from other conditions.",
    symptoms: [
      "Tremor at rest",
      "Slowness of movement",
      "Muscle rigidity",
      "Balance problems",
      "Shuffling gait",
      "Reduced arm swing",
    ],
    recommendedServices: [
      "mri-brain",
      "brain-mri",
      "neurology-pet-ct",
      "pet-ct",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Neurological",
  },
  {
    id: "multiple-sclerosis",
    title: "Multiple Sclerosis",
    description:
      "Autoimmune demyelinating disease of the central nervous system. MRI of the brain and spine with contrast is the cornerstone investigation for diagnosis and monitoring.",
    symptoms: [
      "Vision problems (optic neuritis)",
      "Numbness or tingling",
      "Muscle weakness",
      "Balance and coordination issues",
      "Fatigue",
      "Bladder dysfunction",
    ],
    recommendedServices: [
      "mri-brain",
      "mri-spine",
      "whole-spine-mri",
      "contrast-mri",
      "mri-orbit",
      "blood-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Neurological",
  },
  {
    id: "vision-problems",
    title: "Vision Problems",
    description:
      "Visual disturbances from neurological, orbital, or vascular causes. MRI orbit and brain evaluate the optic nerve, visual pathways, and orbital structures.",
    symptoms: [
      "Blurred vision",
      "Double vision",
      "Sudden vision loss",
      "Floaters or flashes",
      "Visual field defects",
    ],
    recommendedServices: [
      "mri-orbit",
      "mri-brain",
      "ct-orbit",
      "carotid-doppler",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Neurological",
  },
  {
    id: "hearing-loss",
    title: "Hearing Loss",
    description:
      "Sensorineural or conductive hearing loss requiring imaging to evaluate the inner ear, auditory nerve, and temporal bone structures.",
    symptoms: [
      "Difficulty hearing conversations",
      "Ringing in ears (tinnitus)",
      "Feeling of ear fullness",
      "Need to increase volume",
      "Sudden hearing loss",
    ],
    recommendedServices: [
      "mri-brain",
      "ct-temporal-bone",
      "brain-mri",
      "mri-brain-screening",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Neurological",
  },

  // ─────────────────────────────────────────────
  // ABDOMINAL & GI CONDITIONS
  // ─────────────────────────────────────────────
  {
    id: "abdominal-pain",
    title: "Abdominal Pain",
    description:
      "Acute or chronic abdominal pain requiring imaging to evaluate the liver, gallbladder, kidneys, pancreas, and intestines for pathology.",
    symptoms: [
      "Upper or lower abdominal pain",
      "Pain after eating",
      "Bloating",
      "Nausea and vomiting",
      "Changes in bowel habits",
    ],
    recommendedServices: [
      "abdominal-ultrasound",
      "whole-abdomen-ultrasound",
      "abdomen-ct-scan",
      "ct-abdomen-pelvis",
      "blood-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Gastrointestinal",
  },
  {
    id: "fatty-liver",
    title: "Fatty Liver Disease",
    description:
      "Non-alcoholic fatty liver disease (NAFLD/NASH) requiring FibroScan for fibrosis staging and ultrasound for initial detection. Early diagnosis prevents progression to cirrhosis.",
    symptoms: [
      "Often asymptomatic",
      "Fatigue",
      "Right upper abdominal discomfort",
      "Mild liver enlargement",
      "Elevated liver enzymes on blood test",
    ],
    recommendedServices: [
      "fibroscan",
      "liver-fibroscan",
      "fatty-liver-assessment",
      "fatty-liver-screening",
      "liver-function-test",
      "abdominal-ultrasound",
    ],
    urgencyLevel: "routine",
    bodySystem: "Gastrointestinal",
  },
  {
    id: "liver-disease",
    title: "Liver Disease",
    description:
      "Comprehensive evaluation for chronic liver disease including hepatitis, cirrhosis, and liver fibrosis. FibroScan, ultrasound, and LFT are essential investigations.",
    symptoms: [
      "Jaundice (yellowing of skin/eyes)",
      "Abdominal swelling (ascites)",
      "Dark urine",
      "Fatigue and weakness",
      "Easy bruising",
      "Loss of appetite",
    ],
    recommendedServices: [
      "fibroscan",
      "liver-fibroscan",
      "liver-elastography",
      "liver-function-test",
      "abdominal-ultrasound",
      "hepatobiliary-scan",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Gastrointestinal",
  },
  {
    id: "gallstones",
    title: "Gallstones",
    description:
      "Cholelithiasis causing biliary colic, cholecystitis, or biliary obstruction. Abdominal ultrasound is the first-line investigation; MRCP provides detailed biliary tree evaluation.",
    symptoms: [
      "Right upper abdominal pain",
      "Pain after fatty meals",
      "Nausea and vomiting",
      "Pain radiating to right shoulder",
      "Indigestion",
    ],
    recommendedServices: [
      "abdominal-ultrasound",
      "upper-abdomen-sonography",
      "mri-mrcp",
      "mrcp-scan",
      "ct-abdomen-pelvis",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Gastrointestinal",
  },
  {
    id: "appendicitis",
    title: "Appendicitis",
    description:
      "Inflammation of the appendix requiring urgent imaging for confirmation. Ultrasound and CT abdomen-pelvis are key investigations for diagnosis and ruling out complications.",
    symptoms: [
      "Right lower abdominal pain",
      "Pain migrating from umbilicus",
      "Nausea and vomiting",
      "Loss of appetite",
      "Fever",
      "Rebound tenderness",
    ],
    recommendedServices: [
      "abdominal-ultrasound",
      "ct-abdomen-pelvis",
      "abdomen-ct-scan",
      "cbc-test",
      "blood-test",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Gastrointestinal",
  },
  {
    id: "hernia",
    title: "Hernia",
    description:
      "Abdominal or groin hernia requiring ultrasound for diagnosis and characterization. Dynamic ultrasound during Valsalva maneuver confirms reducibility and size.",
    symptoms: [
      "Visible bulge in abdomen or groin",
      "Pain at bulge site",
      "Heaviness in groin",
      "Pain lifting heavy objects",
      "Discomfort with coughing",
    ],
    recommendedServices: [
      "abdominal-ultrasound",
      "groin-ultrasound",
      "inguinal-ultrasound",
      "ct-abdomen-pelvis",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Gastrointestinal",
  },

  // ─────────────────────────────────────────────
  // UROLOGICAL CONDITIONS
  // ─────────────────────────────────────────────
  {
    id: "kidney-disease",
    title: "Kidney Disease",
    description:
      "Chronic kidney disease evaluation including renal function tests, kidney ultrasound, and renal scan (DTPA/EC) for GFR estimation and structural assessment.",
    symptoms: [
      "Swelling in feet and ankles",
      "Fatigue",
      "Decreased urine output",
      "Foamy urine",
      "Loss of appetite",
      "Nausea",
    ],
    recommendedServices: [
      "kidney-function-test",
      "kidney-ultrasound",
      "kub-ultrasound",
      "renal-doppler",
      "renal-scan",
      "gfr-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Urological",
  },
  {
    id: "kidney-stones",
    title: "Kidney Stones",
    description:
      "Renal calculi causing colicky pain, hematuria, and urinary obstruction. CT KUB is the gold standard for stone detection; ultrasound is used for follow-up monitoring.",
    symptoms: [
      "Severe flank pain (renal colic)",
      "Pain radiating to groin",
      "Blood in urine",
      "Nausea and vomiting",
      "Frequent urination",
      "Burning urination",
    ],
    recommendedServices: [
      "ct-kub",
      "kub-ultrasound",
      "kidney-ultrasound",
      "ct-urology",
      "urine-test",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Urological",
  },
  {
    id: "blood-in-urine",
    title: "Blood in Urine (Hematuria)",
    description:
      "Hematuria requiring comprehensive evaluation to rule out kidney stones, urinary tract infection, bladder pathology, or malignancy.",
    symptoms: [
      "Visible blood in urine",
      "Pink or dark-colored urine",
      "Pain with urination",
      "Frequent urination",
      "Lower abdominal pain",
    ],
    recommendedServices: [
      "urine-test",
      "kidney-ultrasound",
      "kub-ultrasound",
      "ct-kub",
      "ct-urology",
      "blood-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Urological",
  },
  {
    id: "frequent-urination",
    title: "Frequent Urination",
    description:
      "Increased urinary frequency from diabetes, UTI, prostate enlargement, or overactive bladder. Blood tests and ultrasound guide diagnosis.",
    symptoms: [
      "Urinating more than 8 times a day",
      "Waking up at night to urinate",
      "Urgency",
      "Difficulty starting urination",
      "Weak urine stream",
    ],
    recommendedServices: [
      "urine-test",
      "diabetes-test",
      "hba1c-test",
      "prostate-ultrasound",
      "kub-ultrasound",
      "kidney-function-test",
    ],
    urgencyLevel: "routine",
    bodySystem: "Urological",
  },
  {
    id: "prostate-issues",
    title: "Prostate Issues",
    description:
      "Evaluation of prostate enlargement, prostatitis, or suspected prostate cancer. Ultrasound, MRI prostate, and PSA testing are key investigations.",
    symptoms: [
      "Difficulty urinating",
      "Weak urine stream",
      "Frequent urination at night",
      "Incomplete bladder emptying",
      "Blood in urine or semen",
    ],
    recommendedServices: [
      "prostate-ultrasound",
      "transrectal-ultrasound",
      "mri-prostate",
      "tumor-marker-test",
      "blood-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Urological",
  },

  // ─────────────────────────────────────────────
  // PREGNANCY & WOMEN'S HEALTH CONDITIONS
  // ─────────────────────────────────────────────
  {
    id: "pregnancy-checkup",
    title: "Pregnancy Checkup",
    description:
      "Routine antenatal evaluation including trimester-appropriate ultrasound scans, NT scan, anomaly scan, growth monitoring, and prenatal blood work for a healthy pregnancy.",
    symptoms: [
      "Missed period",
      "Positive pregnancy test",
      "Morning sickness",
      "Breast tenderness",
      "Fatigue in early pregnancy",
    ],
    recommendedServices: [
      "pregnancy-sonography",
      "obstetric-ultrasound",
      "nt-scan",
      "anomaly-scan",
      "growth-scan",
      "blood-test",
    ],
    urgencyLevel: "routine",
    bodySystem: "Reproductive",
  },
  {
    id: "irregular-periods",
    title: "Irregular Periods",
    description:
      "Menstrual irregularities including oligomenorrhea, amenorrhea, or heavy bleeding requiring hormonal evaluation and pelvic ultrasound to identify the cause.",
    symptoms: [
      "Irregular menstrual cycles",
      "Heavy or prolonged bleeding",
      "Missed periods",
      "Spotting between periods",
      "Painful periods",
    ],
    recommendedServices: [
      "pelvic-ultrasound",
      "transvaginal-ultrasound",
      "hormone-test",
      "thyroid-test",
      "blood-test",
      "gynecology-ultrasound",
    ],
    urgencyLevel: "routine",
    bodySystem: "Reproductive",
  },
  {
    id: "infertility",
    title: "Infertility",
    description:
      "Evaluation of male and female infertility including follicular study, HSG test, hormonal panels, semen analysis, and genetic screening to identify treatable causes.",
    symptoms: [
      "Inability to conceive after 12 months",
      "Irregular periods",
      "History of miscarriages",
      "Hormonal symptoms",
      "Pelvic pain",
    ],
    recommendedServices: [
      "follicular-study",
      "fertility-scan",
      "fertility-assessment",
      "hsg-test",
      "hormone-test",
      "fertility-genetic-test",
    ],
    urgencyLevel: "routine",
    bodySystem: "Reproductive",
  },
  {
    id: "breast-lump",
    title: "Breast Lump",
    description:
      "Palpable breast lump requiring triple assessment with clinical examination, imaging (mammography and ultrasound), and tissue sampling (FNAC/biopsy) for definitive diagnosis.",
    symptoms: [
      "Palpable lump in breast",
      "Breast pain",
      "Change in breast shape or size",
      "Nipple discharge",
      "Skin dimpling on breast",
    ],
    recommendedServices: [
      "mammography",
      "digital-mammography",
      "sonomammography",
      "breast-ultrasound",
      "guided-fnac",
      "breast-mri",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Reproductive",
  },
  {
    id: "pcod-pcos",
    title: "PCOD / PCOS",
    description:
      "Polycystic ovarian disease/syndrome evaluation including pelvic ultrasound for ovarian morphology, hormonal panel, insulin resistance markers, and thyroid function tests.",
    symptoms: [
      "Irregular periods",
      "Excess facial or body hair",
      "Acne",
      "Weight gain",
      "Difficulty conceiving",
      "Thinning scalp hair",
    ],
    recommendedServices: [
      "pelvic-ultrasound",
      "transvaginal-ultrasound",
      "hormone-test",
      "thyroid-test",
      "hba1c-test",
      "blood-test",
    ],
    urgencyLevel: "routine",
    bodySystem: "Reproductive",
  },
  {
    id: "endometriosis",
    title: "Endometriosis",
    description:
      "Endometrial tissue growing outside the uterus causing chronic pelvic pain and infertility. Transvaginal ultrasound and MRI pelvis are key imaging investigations.",
    symptoms: [
      "Severe menstrual cramps",
      "Chronic pelvic pain",
      "Pain during intercourse",
      "Heavy periods",
      "Infertility",
      "Painful bowel movements",
    ],
    recommendedServices: [
      "transvaginal-ultrasound",
      "pelvic-ultrasound",
      "pelvis-mri",
      "gynecology-ultrasound",
      "blood-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Reproductive",
  },
  {
    id: "fibroids",
    title: "Uterine Fibroids",
    description:
      "Uterine leiomyomas causing heavy bleeding, pelvic pressure, and reproductive issues. Pelvic ultrasound and MRI provide accurate size, location, and characterization.",
    symptoms: [
      "Heavy menstrual bleeding",
      "Prolonged periods",
      "Pelvic pressure or pain",
      "Frequent urination",
      "Abdominal enlargement",
    ],
    recommendedServices: [
      "pelvic-ultrasound",
      "transvaginal-ultrasound",
      "pelvis-mri",
      "gynecology-ultrasound",
      "cbc-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Reproductive",
  },
  {
    id: "ovarian-cyst",
    title: "Ovarian Cyst",
    description:
      "Fluid-filled sacs on the ovary, most benign but some require monitoring. Pelvic ultrasound with Doppler evaluates cyst characteristics and vascularity.",
    symptoms: [
      "Lower abdominal pain (one-sided)",
      "Bloating",
      "Pelvic pressure",
      "Pain during periods",
      "Irregular periods",
    ],
    recommendedServices: [
      "pelvic-ultrasound",
      "transvaginal-ultrasound",
      "gynecology-ultrasound",
      "color-doppler",
      "tumor-marker-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Reproductive",
  },

  // ─────────────────────────────────────────────
  // ENDOCRINE & METABOLIC CONDITIONS
  // ─────────────────────────────────────────────
  {
    id: "diabetes-screening",
    title: "Diabetes Screening",
    description:
      "Comprehensive diabetes evaluation including fasting glucose, HbA1c, glucose tolerance test, and screening for diabetic complications in eyes, kidneys, and nerves.",
    symptoms: [
      "Increased thirst",
      "Frequent urination",
      "Unexplained weight loss",
      "Fatigue",
      "Blurred vision",
      "Slow-healing wounds",
    ],
    recommendedServices: [
      "diabetes-test",
      "hba1c-test",
      "blood-test",
      "kidney-function-test",
      "lipid-profile",
      "diabetes-health-checkup",
    ],
    urgencyLevel: "routine",
    bodySystem: "Endocrine",
  },
  {
    id: "thyroid-disorder",
    title: "Thyroid Disorder",
    description:
      "Evaluation of hypothyroidism, hyperthyroidism, thyroid nodules, and thyroid cancer. Thyroid function tests, ultrasound, and FNAC are the cornerstones of diagnosis.",
    symptoms: [
      "Unexplained weight gain or loss",
      "Fatigue",
      "Neck swelling",
      "Hair loss",
      "Mood changes",
      "Irregular heartbeat",
    ],
    recommendedServices: [
      "thyroid-test",
      "thyroid-profile",
      "thyroid-ultrasound",
      "thyroid-scan",
      "guided-fnac",
      "hormone-test",
    ],
    urgencyLevel: "routine",
    bodySystem: "Endocrine",
  },
  {
    id: "hormonal-imbalance",
    title: "Hormonal Imbalance",
    description:
      "Comprehensive hormonal evaluation for symptoms of endocrine dysfunction affecting reproductive, thyroid, adrenal, or pituitary function.",
    symptoms: [
      "Irregular periods",
      "Unexplained weight changes",
      "Mood swings",
      "Fatigue",
      "Acne",
      "Hair thinning",
    ],
    recommendedServices: [
      "hormone-test",
      "thyroid-test",
      "thyroid-profile",
      "blood-test",
      "mri-pituitary",
      "pelvic-ultrasound",
    ],
    urgencyLevel: "routine",
    bodySystem: "Endocrine",
  },
  {
    id: "calcium-deficiency",
    title: "Calcium Deficiency",
    description:
      "Low calcium levels (hypocalcemia) affecting bone health, muscle function, and nerve signaling. Blood tests and DEXA scan assess severity and bone impact.",
    symptoms: [
      "Muscle cramps",
      "Numbness and tingling",
      "Brittle nails",
      "Dental problems",
      "Fatigue",
      "Osteoporosis risk",
    ],
    recommendedServices: [
      "blood-test",
      "vitamin-d-test",
      "dexa-bone-scan",
      "bone-density-test",
      "thyroid-test",
      "parathyroid-scan",
    ],
    urgencyLevel: "routine",
    bodySystem: "Endocrine",
  },
  {
    id: "vitamin-deficiency",
    title: "Vitamin Deficiency",
    description:
      "Common vitamin deficiencies (D, B12, folate) causing fatigue, neurological symptoms, and bone problems. Blood tests identify specific deficiencies for targeted supplementation.",
    symptoms: [
      "Fatigue and weakness",
      "Numbness in hands/feet",
      "Muscle weakness",
      "Bone pain",
      "Depression",
      "Poor wound healing",
    ],
    recommendedServices: [
      "vitamin-d-test",
      "vitamin-b12-test",
      "blood-test",
      "cbc-test",
      "iron-profile",
    ],
    urgencyLevel: "routine",
    bodySystem: "Endocrine",
  },
  {
    id: "iron-deficiency",
    title: "Iron Deficiency",
    description:
      "Iron deficiency anemia evaluation including iron profile, CBC, and ferritin levels. Important to identify the underlying cause including GI blood loss or dietary insufficiency.",
    symptoms: [
      "Fatigue and weakness",
      "Pale skin",
      "Shortness of breath on exertion",
      "Dizziness",
      "Cold hands and feet",
      "Brittle nails",
    ],
    recommendedServices: [
      "iron-profile",
      "cbc-test",
      "blood-test",
      "stool-test",
      "abdominal-ultrasound",
    ],
    urgencyLevel: "routine",
    bodySystem: "Endocrine",
  },

  // ─────────────────────────────────────────────
  // GENERAL / SYSTEMIC CONDITIONS
  // ─────────────────────────────────────────────
  {
    id: "cancer-screening",
    title: "Cancer Screening",
    description:
      "Comprehensive cancer screening including PET CT, tumor markers, mammography, and organ-specific imaging for early detection in high-risk individuals.",
    symptoms: [
      "Family history of cancer",
      "Unexplained weight loss",
      "Persistent fatigue",
      "Unusual lumps",
      "Changes in bowel or bladder habits",
      "Unexplained bleeding",
    ],
    recommendedServices: [
      "whole-body-pet-ct",
      "pet-ct",
      "tumor-marker-test",
      "mammography",
      "cancer-screening",
      "whole-body-mri",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Oncology",
  },
  {
    id: "anemia",
    title: "Anemia",
    description:
      "Low hemoglobin evaluation requiring complete blood count, iron studies, B12/folate levels, and investigation for the underlying cause.",
    symptoms: [
      "Fatigue and weakness",
      "Pale skin and mucous membranes",
      "Shortness of breath",
      "Rapid heartbeat",
      "Dizziness",
      "Cold extremities",
    ],
    recommendedServices: [
      "cbc-test",
      "iron-profile",
      "vitamin-b12-test",
      "blood-test",
      "stool-test",
    ],
    urgencyLevel: "routine",
    bodySystem: "Hematological",
  },
  {
    id: "chronic-fatigue",
    title: "Chronic Fatigue",
    description:
      "Persistent, unexplained fatigue lasting more than 6 months requiring comprehensive workup to rule out thyroid dysfunction, anemia, diabetes, and organ-specific disease.",
    symptoms: [
      "Extreme tiredness despite rest",
      "Unrefreshing sleep",
      "Difficulty concentrating",
      "Muscle aches",
      "Headaches",
      "Sore throat",
    ],
    recommendedServices: [
      "thyroid-test",
      "cbc-test",
      "blood-test",
      "vitamin-d-test",
      "hba1c-test",
      "liver-function-test",
    ],
    urgencyLevel: "routine",
    bodySystem: "Systemic",
  },
  {
    id: "weight-loss-unexplained",
    title: "Unexplained Weight Loss",
    description:
      "Significant unintentional weight loss (>5% body weight in 6 months) requiring investigation for malignancy, endocrine disorders, infections, and malabsorption.",
    symptoms: [
      "Weight loss without trying",
      "Loss of appetite",
      "Fatigue",
      "Muscle wasting",
      "Night sweats",
      "Fever",
    ],
    recommendedServices: [
      "whole-body-pet-ct",
      "ct-abdomen-pelvis",
      "thyroid-test",
      "blood-test",
      "cbc-test",
      "tumor-marker-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Systemic",
  },
  {
    id: "night-sweats",
    title: "Night Sweats",
    description:
      "Drenching night sweats that may indicate lymphoma, tuberculosis, endocarditis, or hormonal conditions. Imaging and blood work help identify the cause.",
    symptoms: [
      "Waking up soaked in sweat",
      "Night sweats requiring sheet changes",
      "Associated weight loss",
      "Fever",
      "Fatigue",
    ],
    recommendedServices: [
      "blood-test",
      "cbc-test",
      "hrct-chest",
      "whole-body-pet-ct",
      "thyroid-test",
      "infection-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Systemic",
  },
  {
    id: "swollen-lymph-nodes",
    title: "Swollen Lymph Nodes",
    description:
      "Persistent lymphadenopathy requiring ultrasound evaluation and possible FNAC to differentiate reactive, infectious, and malignant causes.",
    symptoms: [
      "Palpable lumps in neck, armpit, or groin",
      "Painless or tender swelling",
      "Fever",
      "Night sweats",
      "Weight loss",
    ],
    recommendedServices: [
      "neck-ultrasound",
      "axilla-ultrasound",
      "guided-fnac",
      "cbc-test",
      "pet-ct",
      "blood-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Systemic",
  },

  // ─────────────────────────────────────────────
  // RESPIRATORY CONDITIONS
  // ─────────────────────────────────────────────
  {
    id: "difficulty-breathing",
    title: "Difficulty Breathing",
    description:
      "Dyspnea from cardiac, pulmonary, or systemic causes. HRCT chest, echocardiography, and pulmonary function assessment help determine the etiology.",
    symptoms: [
      "Shortness of breath on exertion",
      "Breathlessness at rest",
      "Wheezing",
      "Cough with breathlessness",
      "Inability to lie flat",
    ],
    recommendedServices: [
      "hrct-chest",
      "chest-ct-scan",
      "2d-echo",
      "ecg",
      "lung-perfusion-scan",
      "ct-pulmonary-angiography",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Respiratory",
  },
  {
    id: "lung-disease",
    title: "Lung Disease",
    description:
      "Evaluation of interstitial lung disease, COPD, pulmonary fibrosis, and lung infections. HRCT chest is the gold standard for parenchymal lung disease assessment.",
    symptoms: [
      "Chronic cough",
      "Breathlessness on exertion",
      "Dry cough",
      "Chest discomfort",
      "Reduced exercise tolerance",
      "Recurrent chest infections",
    ],
    recommendedServices: [
      "hrct-chest",
      "hrct-scan",
      "chest-ct-scan",
      "low-dose-ct",
      "lung-perfusion-scan",
      "blood-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Respiratory",
  },

  // ─────────────────────────────────────────────
  // ADDITIONAL CONDITIONS
  // ─────────────────────────────────────────────
  {
    id: "swollen-legs",
    title: "Swollen Legs",
    description:
      "Leg edema from venous insufficiency, DVT, cardiac failure, or renal disease. Doppler ultrasound and blood tests help identify the underlying cause.",
    symptoms: [
      "Bilateral or unilateral leg swelling",
      "Pitting edema",
      "Heaviness in legs",
      "Skin changes on lower legs",
      "Pain in calves",
    ],
    recommendedServices: [
      "lower-limb-doppler",
      "venous-doppler",
      "dvt-doppler",
      "2d-echo",
      "kidney-function-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Cardiovascular",
  },
  {
    id: "thyroid-nodule",
    title: "Thyroid Nodule",
    description:
      "Thyroid nodules found on examination or incidentally on imaging. Ultrasound characterization with TIRADS scoring and FNAC determines if the nodule requires surgery or monitoring.",
    symptoms: [
      "Visible or palpable neck swelling",
      "Difficulty swallowing",
      "Hoarseness of voice",
      "Tight feeling in throat",
      "Often incidentally discovered",
    ],
    recommendedServices: [
      "thyroid-ultrasound",
      "guided-fnac",
      "thyroid-test",
      "thyroid-scan",
      "neck-ultrasound",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Endocrine",
  },
  {
    id: "recurrent-miscarriage",
    title: "Recurrent Miscarriage",
    description:
      "Two or more consecutive pregnancy losses requiring comprehensive evaluation of uterine anatomy, hormones, thrombophilia, and genetic factors.",
    symptoms: [
      "Multiple pregnancy losses",
      "Vaginal bleeding in early pregnancy",
      "Cramping in early pregnancy",
      "Difficulty maintaining pregnancy",
    ],
    recommendedServices: [
      "pelvic-ultrasound",
      "transvaginal-ultrasound",
      "karyotype-test",
      "hormone-test",
      "blood-test",
      "genetic-counselling",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Reproductive",
  },
  {
    id: "high-risk-pregnancy",
    title: "High Risk Pregnancy",
    description:
      "Pregnancy complicated by maternal age, diabetes, hypertension, multiple gestation, or prior adverse outcomes requiring enhanced fetal surveillance and specialized imaging.",
    symptoms: [
      "Advanced maternal age (>35)",
      "Pre-existing diabetes or hypertension",
      "Multiple pregnancy",
      "Previous pregnancy complications",
      "Abnormal screening results",
    ],
    recommendedServices: [
      "high-risk-pregnancy-scan",
      "fetal-doppler",
      "fetal-echocardiography",
      "growth-scan",
      "anomaly-scan",
      "nipt-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Reproductive",
  },
  {
    id: "prenatal-genetic-concerns",
    title: "Prenatal Genetic Concerns",
    description:
      "Screening for fetal chromosomal abnormalities and genetic conditions. NIPT, NT scan, and genetic counselling help expectant parents understand risks and options.",
    symptoms: [
      "Advanced maternal age",
      "Family history of genetic disorders",
      "Abnormal NT scan result",
      "Abnormal serum screening",
      "Previous child with genetic condition",
    ],
    recommendedServices: [
      "nipt-test",
      "nt-scan",
      "genetic-counselling",
      "prenatal-genetic-testing",
      "karyotype-test",
      "fetal-genetic-testing",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Reproductive",
  },
  {
    id: "liver-cirrhosis",
    title: "Liver Cirrhosis",
    description:
      "Advanced chronic liver disease with fibrosis and architectural distortion. FibroScan stages fibrosis severity; portal Doppler evaluates for portal hypertension.",
    symptoms: [
      "Jaundice",
      "Abdominal distension (ascites)",
      "Easy bleeding and bruising",
      "Confusion (hepatic encephalopathy)",
      "Spider angiomas on skin",
      "Muscle wasting",
    ],
    recommendedServices: [
      "fibroscan",
      "liver-fibroscan",
      "cirrhosis-screening",
      "liver-function-test",
      "abdominal-ultrasound",
      "vascular-doppler",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Gastrointestinal",
  },
  {
    id: "cardiac-arrhythmia",
    title: "Cardiac Arrhythmia",
    description:
      "Abnormal heart rhythm (fast, slow, or irregular) requiring ECG and extended Holter monitoring to document the pattern and guide management.",
    symptoms: [
      "Irregular heartbeat",
      "Rapid heart rate",
      "Slow heart rate",
      "Dizziness or fainting",
      "Chest flutter",
      "Shortness of breath",
    ],
    recommendedServices: [
      "ecg",
      "holter-monitoring",
      "24-hour-holter",
      "48-hour-holter",
      "2d-echo",
      "thyroid-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Cardiovascular",
  },
  {
    id: "congenital-heart-disease",
    title: "Congenital Heart Disease",
    description:
      "Structural heart defects present from birth requiring echocardiography and cardiac MRI for anatomic evaluation and surgical planning.",
    symptoms: [
      "Heart murmur",
      "Breathlessness on exertion",
      "Blue discoloration of lips or nails",
      "Poor weight gain in infants",
      "Frequent chest infections",
    ],
    recommendedServices: [
      "2d-echo",
      "echocardiography",
      "cardiac-mri",
      "cardiac-ct-scan",
      "ecg",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Cardiovascular",
  },
  {
    id: "abdominal-mass",
    title: "Abdominal Mass",
    description:
      "Palpable or incidentally found abdominal mass requiring imaging to characterize origin, nature (solid vs cystic), and guide biopsy or surgical planning.",
    symptoms: [
      "Palpable lump in abdomen",
      "Abdominal pain",
      "Bloating and distension",
      "Change in bowel habits",
      "Weight loss",
    ],
    recommendedServices: [
      "abdominal-ultrasound",
      "ct-abdomen-pelvis",
      "abdominal-mri",
      "guided-biopsy",
      "pet-ct",
      "tumor-marker-test",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Gastrointestinal",
  },
  {
    id: "testicular-mass",
    title: "Testicular Mass",
    description:
      "Scrotal swelling or mass requiring urgent ultrasound to differentiate benign conditions (hydrocele, epididymal cyst) from testicular tumors. Tumor markers complete the evaluation.",
    symptoms: [
      "Painless testicular lump",
      "Scrotal heaviness",
      "Dull ache in lower abdomen",
      "Scrotal swelling",
      "Back pain (if advanced)",
    ],
    recommendedServices: [
      "scrotal-ultrasound",
      "testicular-ultrasound",
      "tumor-marker-test",
      "ct-abdomen-pelvis",
      "blood-test",
    ],
    urgencyLevel: "urgent",
    bodySystem: "Urological",
  },
  {
    id: "jaundice",
    title: "Jaundice",
    description:
      "Yellowing of skin and eyes from liver, biliary, or hemolytic causes. Liver function tests, abdominal ultrasound, and MRCP evaluate the level and cause of obstruction.",
    symptoms: [
      "Yellow skin and eyes",
      "Dark urine",
      "Pale stools",
      "Itching",
      "Fatigue",
      "Abdominal pain",
    ],
    recommendedServices: [
      "liver-function-test",
      "abdominal-ultrasound",
      "mri-mrcp",
      "mrcp-scan",
      "cbc-test",
      "blood-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Gastrointestinal",
  },
  {
    id: "pancreatic-disease",
    title: "Pancreatic Disease",
    description:
      "Evaluation of pancreatitis, pancreatic cysts, or pancreatic tumors. CT abdomen and MRCP are key imaging modalities; PET CT helps in staging pancreatic malignancy.",
    symptoms: [
      "Severe upper abdominal pain radiating to back",
      "Nausea and vomiting",
      "Weight loss",
      "New-onset diabetes",
      "Jaundice",
      "Steatorrhea (fatty stools)",
    ],
    recommendedServices: [
      "ct-abdomen-pelvis",
      "mri-mrcp",
      "abdominal-ultrasound",
      "pet-ct",
      "blood-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Gastrointestinal",
  },
  {
    id: "urinary-tract-infection",
    title: "Urinary Tract Infection",
    description:
      "Recurrent or complicated UTI requiring urine analysis and imaging to rule out structural abnormalities, kidney stones, or obstruction.",
    symptoms: [
      "Burning urination",
      "Frequent urination",
      "Urgency",
      "Cloudy or foul-smelling urine",
      "Lower abdominal pain",
      "Fever and chills (if upper UTI)",
    ],
    recommendedServices: [
      "urine-test",
      "kidney-ultrasound",
      "kub-ultrasound",
      "blood-test",
      "cbc-test",
    ],
    urgencyLevel: "moderate",
    bodySystem: "Urological",
  },
  {
    id: "sinusitis",
    title: "Sinusitis",
    description:
      "Chronic or recurrent sinusitis requiring CT PNS or MRI to evaluate sinus anatomy, mucosal disease, and complications such as polyps or mucoceles.",
    symptoms: [
      "Facial pain and pressure",
      "Nasal congestion",
      "Thick nasal discharge",
      "Post-nasal drip",
      "Reduced sense of smell",
      "Headache over forehead",
    ],
    recommendedServices: [
      "ct-pns",
      "mri-paranasal-sinus",
      "ct-face",
      "mri-face",
    ],
    urgencyLevel: "routine",
    bodySystem: "ENT",
  },
  {
    id: "salivary-gland-swelling",
    title: "Salivary Gland Swelling",
    description:
      "Swelling of parotid or submandibular salivary glands from stones, infection, or tumors. Ultrasound is the initial imaging of choice; MRI provides detailed characterization.",
    symptoms: [
      "Swelling below ear or jaw",
      "Pain during eating",
      "Dry mouth",
      "Recurrent swelling",
      "Difficulty opening mouth",
    ],
    recommendedServices: [
      "parotid-ultrasound",
      "salivary-gland-ultrasound",
      "neck-ultrasound",
      "mri-face",
      "guided-fnac",
    ],
    urgencyLevel: "routine",
    bodySystem: "ENT",
  },
  {
    id: "neck-mass",
    title: "Neck Mass",
    description:
      "Evaluation of neck lumps from thyroid nodules, lymphadenopathy, salivary gland tumors, or congenital cysts. Ultrasound with FNAC is the standard diagnostic approach.",
    symptoms: [
      "Visible or palpable neck lump",
      "Difficulty swallowing",
      "Hoarseness",
      "Progressive enlargement",
      "Associated weight loss or night sweats",
    ],
    recommendedServices: [
      "neck-ultrasound",
      "neck-sonography",
      "thyroid-ultrasound",
      "guided-fnac",
      "ct-neck",
      "mri-neck",
    ],
    urgencyLevel: "moderate",
    bodySystem: "ENT",
  },
];

export function getConditionById(
  conditionId: string
): MedicalCondition | undefined {
  return CONDITIONS.find((c) => c.id === conditionId);
}

export function getConditionsByBodySystem(
  bodySystem: string
): MedicalCondition[] {
  return CONDITIONS.filter((c) => c.bodySystem === bodySystem);
}

export function getConditionsByUrgency(
  urgencyLevel: MedicalCondition["urgencyLevel"]
): MedicalCondition[] {
  return CONDITIONS.filter((c) => c.urgencyLevel === urgencyLevel);
}

export function getConditionsForService(
  serviceSlug: string
): MedicalCondition[] {
  return CONDITIONS.filter((c) =>
    c.recommendedServices.includes(serviceSlug)
  );
}
