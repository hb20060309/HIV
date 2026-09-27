const STORAGE_KEY = 'women-xian-shuo-qing-chu-v1';

const chapters = [
  ['序章', '创建你的视角'],
  ['第一章', '那一晚之后'],
  ['第二章', '到底什么会传播'],
  ['第三章', '要不要检测'],
  ['第四章', '他只说，想去检测'],
  ['第五章', '下一次可以更早'],
  ['第六章', '你会怎么说'],
];

const chapterNotes = [
  '身份不改变医学事实',
  '记录与及时行动',
  '事实、日常与疑问',
  '检测不是感染结论',
  '陪伴与隐私边界',
  '三阶段预防计划',
  '把事实说给更多人',
];

const profileFields = [
  { key: 'identity', title: '你希望如何被称呼？', options: ['女生', '男生', '非二元 / 其他', '不设定'] },
  { key: 'orientation', title: '你的情感与亲密关系视角', options: ['异性恋', '同性恋', '双性恋 / 泛性恋', '不设定'] },
  { key: 'relationship', title: '你目前的关系状态', options: ['单身', '恋爱中', '关系未定义', '不设定'] },
  { key: 'helpStyle', title: '遇到健康问题时，你通常会？', options: ['先自己搜索', '先问信任的人', '直接找专业机构', '还不确定'] },
  { key: 'knowledge', title: '你接触过哪些防艾知识？', options: ['第一次了解', '看过一些科普', '参加过培训', '不确定'] },
];

function getProfileLens() {
  const profile = state.profile;
  const identity = {
    '女生': '你也担心一开口，就先被评价“为什么没有保护好自己”。',
    '男生': '你发现承认害怕并不容易，像是必须先表现得若无其事。',
    '非二元 / 其他': '你担心求助会先变成对称谓和身份的解释，而不是先得到帮助。',
    '不设定': '你希望不说明身份，也能先得到清楚、尊重的行动建议。',
  }[profile.identity] || '';
  const orientation = {
    '异性恋': '你提醒自己：异性恋关系并不会自动变成“零风险”。',
    '同性恋': '你担心性取向被当成风险结论，而不是只评估这次具体接触。',
    '双性恋 / 泛性恋': '你不希望别人用性取向猜测伴侣，更不希望它被当成风险答案。',
    '不设定': '你不需要公开性取向，专业评估只需要与这次接触有关的信息。',
  }[profile.orientation] || '';
  const relationships = {
    '单身': {
      thought: '这次亲密接触没有清晰的关系承诺，你不确定该怎样重新开口。',
      question: '“我们并不熟，我需要知道你到底有没有HIV。”',
      feedback: '关系不熟让追问看起来更直接，但对方的身份仍不能替代对这次接触的评估。',
      plan: '因为目前单身，你把“开始新的亲密关系前怎样沟通边界”写进了计划。',
    },
    '恋爱中': {
      thought: '“我们彼此信任”这个念头，一度让你想跳过对具体情况的评估。',
      question: '“我们在一起这么久，你能保证自己没有HIV吗？”',
      feedback: '信任对关系很重要，但它不能替代对具体接触方式和防护情况的评估。',
      plan: '因为正在恋爱，你把防护、检测和隐私边界变成一次双方都能参与的沟通。',
    },
    '关系未定义': {
      thought: '你担心一谈防护和检测，这段尚未定义的关系就会突然变得尴尬。',
      question: '“我们到底算什么先不谈，你能保证自己没有HIV吗？”',
      feedback: '关系尚未定义也不意味着必须用追问换取安全感，具体风险仍应由专业人员评估。',
      plan: '因为关系尚未定义，你在计划里给“如何开口谈防护”留出了更明确的位置。',
    },
    '不设定': {
      thought: '无论这段关系叫什么名字，都不能用关系身份代替具体风险评估。',
      question: '“你能保证自己没有HIV吗？”',
      feedback: '对方的回答不能替代对这次具体接触方式和防护情况的评估。',
      plan: '无论关系状态如何，你都可以事先沟通防护、检测和隐私边界。',
    },
  };
  const relationship = relationships[profile.relationship] || relationships['不设定'];
  const help = {
    '先自己搜索': '你平时习惯先搜索，这次搜索框也最先出现在脑海里。',
    '先问信任的人': '你本能地想找一个信任的人，但又担心自己的经历被追问。',
    '直接找专业机构': '你平时更愿意直接求助，但真正拿起手机时仍会犹豫。',
    '还不确定': '你没有固定的求助方式，几种做法同时浮现在脑海里。',
  }[profile.helpStyle] || '';
  const knowledge = {
    '第一次了解': 'PEP、PrEP这些缩写对你还很陌生，提示会从行动顺序讲起。',
    '看过一些科普': '你记得一些词，却不确定怎样放到这次具体情境里。',
    '参加过培训': '你接触过系统知识，但轮到自己时，焦虑仍可能挤掉熟悉的判断。',
    '不确定': '你不确定自己知道多少，所以决定把每一步重新核实清楚。',
  }[profile.knowledge] || '';
  const testing = {
    '第一次了解': '你这才把两件事分开：PEP用于潜在暴露后的紧急预防，检测用于了解感染状态。',
    '看过一些科普': '你记得“窗口期”这个词，但具体检测与复查节点仍应由专业人员结合情况说明。',
    '参加过培训': '你知道检测方法和时间会影响结果解释，因此没有把一次检测当作全部随访。',
    '不确定': '你先抓住最重要的一点：没有症状不能代替检测，具体时间听取专业建议。',
  }[profile.knowledge] || '';
  const pep = {
    '第一次了解': '你第一次把PEP理解为“潜在暴露后的预防”，也第一次知道它通常需要连续服用28天。',
    '看过一些科普': '你以前听过PEP和28天疗程，这次开始注意漏服、不适与后续复查该怎样处理。',
    '参加过培训': '你知道规范用药很重要，也知道真实情境中仍应把漏服或不适交给专业人员判断。',
    '不确定': '你不要求自己记住所有药物细节，只记住不擅自停药、换药或加量。',
  }[profile.knowledge] || '';
  return { identity, orientation, relationship, help, knowledge, testing, pep };
}

const transmissionCards = [
  {
    title: '没有采取有效防护的阴道性交或肛交',
    detail: '涉及可能含有HIV的体液与黏膜或破损皮肤接触。',
    answer: 'route',
    fact: '这是需要认真评估的传播相关情境。一次潜在暴露不等于感染，应结合具体情况寻求专业评估。',
  },
  {
    title: '共用注射器或针具',
    detail: '针具可能残留血液。',
    answer: 'route',
    fact: '共用受污染的注射器具可能造成血液传播，不应共用针具。',
  },
  {
    title: '一起吃饭、共用餐具',
    detail: '普通校园聚餐，没有血液暴露。',
    answer: 'daily',
    fact: 'HIV不会通过共同进餐或共用餐具传播，没有必要疏远任何人。',
  },
  {
    title: '拥抱、握手或共用教室',
    detail: '普通的学习和生活接触。',
    answer: 'daily',
    fact: '这些日常接触不会传播HIV。回避和隔离只会制造污名。',
  },
  {
    title: '被蚊虫叮咬',
    detail: '担心蚊虫从别人那里“带来”病毒。',
    answer: 'daily',
    fact: '蚊虫叮咬不会传播HIV。病毒不能在蚊虫体内复制，叮咬也不会把前一个人的血注入下一个人。',
  },
  {
    title: '普通接吻',
    detail: '双方口腔没有明显出血或开放伤口。',
    answer: 'daily',
    fact: '唾液不构成HIV传播所需的体液条件，普通接吻不会传播HIV。',
  },
  {
    title: '接触到他人血液，手上恰好有开放伤口',
    detail: '是否直接接触、接触量和时间都不清楚。',
    answer: 'consult',
    fact: '这种描述需要补充具体信息，不能只凭一句话判断。应尽快联系专业机构评估。',
  },
];

const planItems = [
  { id: 'condom', phase: 'before', title: '正确、全程使用安全套', note: '暴露前' },
  { id: 'prep', phase: 'before', title: '咨询PrEP是否适合自己', note: '暴露前' },
  { id: 'talk', phase: 'before', title: '沟通防护与检测边界', note: '暴露前' },
  { id: 'record', phase: 'after', title: '记录时间与具体情况', note: '潜在暴露后' },
  { id: 'assess', phase: 'after', title: '尽快接受PEP专业评估', note: '潜在暴露后' },
  { id: 'test', phase: 'confirm', title: '按建议检测和复查', note: '确认感染状态' },
  { id: 'symptom', phase: 'confirm', title: '不依靠症状自行判断', note: '确认感染状态' },
];

const socialPosts = [
  {
    post: '“去做HIV检测的人，是不是生活都很乱？”',
    options: [
      { text: '检测是健康管理，不能用来评价一个人的生活或品格。', good: true, reply: '检测用于了解健康状态。愿意检测是一种负责任的健康行动，不是道德标签。' },
      { text: '也不能这么说，但确实容易让人多想。', reply: '这句话看似中立，却仍把检测和“可疑”绑定，会让真正需要帮助的人更难开口。' },
      { text: '别讨论了，离这样的人远一点就行。', reply: '回避并不能预防HIV，反而会加深污名和错误恐惧。' },
    ],
  },
  {
    post: '“和HIV感染者一起吃饭，会不会被传染？”',
    options: [
      { text: '不会。共同进餐、拥抱和握手都不会传播HIV。', good: true, reply: 'HIV不通过共同进餐等日常接触传播，没有理由隔离感染者。' },
      { text: '最好还是分餐具，更保险。', reply: '分餐具并不能带来额外保护，只会把感染者推向不必要的隔离。' },
      { text: '只要看起来健康就没事。', reply: '外表不能判断感染状态，也不能判断是否具有传播风险。' },
    ],
  },
  {
    post: '“吃PEP，是不是说明已经感染HIV了？”',
    options: [
      { text: '不是。PEP是潜在暴露后的预防措施，不代表已经感染。', good: true, reply: '是否需要PEP由专业人员评估；启动PEP并不是感染结论。' },
      { text: '一般是，不然为什么要吃药？', reply: '这混淆了预防和治疗，可能让需要PEP的人因为害怕标签而错过行动窗口。' },
      { text: '吃完没症状就说明没感染。', reply: '症状不能用来判断感染状态，后续仍需按专业建议检测和复查。' },
    ],
  },
  {
    post: '“感染HIV以后，是不是就不能正常恋爱和生活了？”',
    options: [
      { text: '不是。规范治疗和随访可以支持长期健康生活，U=U也有充分科学证据。', good: true, reply: '规范治疗并持续达到病毒载量检测不到时，不会通过性行为传播HIV，即U=U。' },
      { text: '最好不要恋爱，免得影响别人。', reply: '这把感染者简单排除在亲密关系之外，忽略了治疗、知情沟通与U=U的科学事实。' },
      { text: '这个问题太敏感，不能公开讨论。', reply: '不讨论不会消除误解。准确、尊重地说明事实，能减少恐惧和歧视。' },
    ],
  },
];

function freshState() {
  return {
    started: false,
    chapter: 0,
    view: 'cover',
    hours: 70,
    trust: 72,
    privacy: 82,
    action: 20,
    delay: 0,
    judgment: 0,
    medicationMistakes: 0,
    sharedStory: false,
    professionalHelp: false,
    profile: {},
    found: [],
    sortIndex: 0,
    sorted: [],
    planAdded: [],
    planSelected: '',
    socialIndex: 0,
    history: [],
  };
}

let state = loadState();
const app = document.getElementById('app');

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...freshState(), ...saved } : freshState();
  } catch {
    return freshState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function adjust(changes = {}) {
  Object.entries(changes).forEach(([key, value]) => {
    state[key] = typeof state[key] === 'number' ? state[key] + value : value;
  });
  state.hours = clamp(state.hours, 0, 70);
  state.trust = clamp(state.trust);
  state.privacy = clamp(state.privacy);
  state.action = clamp(state.action);
  saveState();
}

function setView(view, chapter = state.chapter) {
  state.view = view;
  state.chapter = chapter;
  saveState();
}

function shell(content, options = {}) {
  const active = options.chapter ?? state.chapter;
  const progress = options.progress ?? Math.max(3, (active / 6) * 100);
  app.innerHTML = `
    <div class="game-layout">
      <header class="storybook-header">
        <div class="brand"><span class="brand-mark">先</span><div><p>校园健康互动叙事</p><h1>我们先说清楚</h1></div></div>
        <ol class="chapter-list">
          ${chapters.map((chapter, index) => `
            <li class="${index === active ? 'active' : ''} ${index < active ? 'done' : ''}" title="${chapter[1]}">
              <span>${index < active ? '✓' : String(index)}</span><b>${chapter[1]}</b>
            </li>`).join('')}
        </ol>
        <div class="top-actions">
          <button class="icon-button" data-facts type="button" title="随身事实卡" aria-label="随身事实卡">i</button>
          <button class="icon-button" data-restart type="button" title="重新开始" aria-label="重新开始">↻</button>
        </div>
      </header>
      <section class="main-panel">
        <header class="topbar">
          <div class="chapter-heading"><span>${chapters[active][0]}</span><h2>${chapters[active][1]}</h2></div>
          <div class="story-status" aria-label="本局状态">
            <span class="time-note">行动时间 <b>${state.professionalHelp ? '已评估' : `${state.hours}小时`}</b></span>
            <span>信任 <b>${Math.round(state.trust / 20)}/5</b></span>
            <span>隐私 <b>${Math.round(state.privacy / 20)}/5</b></span>
          </div>
        </header>
        <div class="progress"><i style="width:${clamp(progress)}%"></i></div>
        <section class="stage">${content}</section>
        <footer class="game-footer"><span>互动科普不能替代个体化医疗建议</span><button class="text-button" data-facts type="button">查看随身事实卡</button></footer>
      </section>
    </div>`;
  bindChrome();
}

function bindChrome() {
  document.querySelectorAll('[data-facts]').forEach((button) => button.addEventListener('click', () => document.getElementById('factDialog').showModal()));
  document.querySelectorAll('[data-restart]').forEach((button) => button.addEventListener('click', () => document.getElementById('restartDialog').showModal()));
}

function toast(message) {
  document.querySelector('.toast')?.remove();
  const node = document.createElement('div');
  node.className = 'toast';
  node.textContent = message;
  document.body.appendChild(node);
  window.setTimeout(() => node.remove(), 3600);
}

function buttonChoice(option, index) {
  return `<button class="choice" type="button" data-choice="${index}"><b>${option.text}</b>${option.note ? `<small>${option.note}</small>` : ''}</button>`;
}

function renderCover() {
  shell(`
    <section class="cover">
      <div class="cover-content">
        <p class="cover-kicker">FIRST-PERSON INTERACTIVE STORY</p>
        <h2>我们先说清楚</h2>
        <p class="cover-lead">一个关于疑问、行动和陪伴的校园故事。你不需要证明自己是谁，也不用先知道所有答案。</p>
        <div class="cover-meta"><span>约 20 分钟</span><span>六个章节</span><span>进度保存在本机</span></div>
        <button class="button light" id="enterStory" type="button">${state.started ? '继续故事' : '进入故事'} →</button>
      </div>
    </section>`, { chapter: state.started ? state.chapter : 0, progress: state.started ? undefined : 2 });
  document.getElementById('enterStory').addEventListener('click', () => {
    if (!state.started) {
      state.started = true;
      setView('profile', 0);
      renderProfile();
    } else {
      renderCurrent();
    }
  });
}

function renderProfile() {
  setView('profile', 0);
  const selectedCount = profileFields.filter((field) => state.profile[field.key]).length;
  const lens = getProfileLens();
  const previewLines = [
    state.profile.identity && lens.identity,
    state.profile.orientation && lens.orientation,
    state.profile.relationship && lens.relationship.thought,
    state.profile.helpStyle && lens.help,
    state.profile.knowledge && lens.knowledge,
  ].filter(Boolean);
  shell(`
    <section class="view profile-view">
      <div class="view-head">
        <div><p class="eyebrow">进入故事之前</p><h3>创建你的视角</h3><p>这些设定只改变称谓、对话语境和情绪体验，不改变HIV传播风险，也不会把任何身份与感染绑定。</p></div>
        <span class="step-count">${selectedCount} / ${profileFields.length}</span>
      </div>
      <div class="profile-grid">
        ${profileFields.map((field) => `
          <fieldset class="profile-group">
            <legend>${field.title}</legend>
            <div class="option-grid">
              ${field.options.map((option) => `<button class="option ${state.profile[field.key] === option ? 'selected' : ''}" type="button" data-profile="${field.key}" data-value="${option}">${option}</button>`).join('')}
            </div>
          </fieldset>`).join('')}
      </div>
      ${previewLines.length ? `<aside class="profile-preview"><span>这个视角会怎样进入故事</span><p>${previewLines.join(' ')}</p><small>这些差异改变心理活动、对话语境和提示深度，不改变医学事实。</small></aside>` : ''}
      <div class="profile-summary">
        <p>${selectedCount === profileFields.length ? '视角已准备好。医学事实不会因这些选择而改变。' : '完成五项选择后开始；身份项都可以选择“不设定”。'}</p>
        <button class="button" id="startChapter" type="button" ${selectedCount === profileFields.length ? '' : 'disabled'}>开始第一章 →</button>
      </div>
    </section>`, { progress: 6 });
  document.querySelectorAll('[data-profile]').forEach((button) => button.addEventListener('click', () => {
    state.profile[button.dataset.profile] = button.dataset.value;
    saveState();
    renderProfile();
  }));
  document.getElementById('startChapter')?.addEventListener('click', renderInvestigation);
}

const investigationItems = {
  phone: ['手机记录', '确认事情发生在约2小时前'],
  clock: ['发生时间', '时间会影响是否还在PEP评估窗口内'],
  note: ['具体情况', '记录接触方式与当时能确认的细节'],
  protection: ['防护情况', '是否正确、全程使用，是否出现破损'],
};

function renderInvestigation() {
  setView('investigation', 1);
  const lens = getProfileLens();
  shell(`
    <section class="scene-view">
      <div class="scene-canvas room">
        <div class="scene-caption"><span>凌晨 00:46 · 宿舍</span><p>回到房间后，你越想越不确定：刚才的安全套是不是破了？</p></div>
        ${Object.keys(investigationItems).map((id) => `<button class="hotspot ${state.found.includes(id) ? 'done' : ''}" type="button" data-item="${id}" aria-label="查看${investigationItems[id][0]}">${state.found.includes(id) ? '✓' : '+'}</button>`).join('')}
      </div>
      <div class="scene-dock">
        <div class="perspective-note"><b>此刻的你</b><span>${lens.identity} ${lens.relationship.thought}</span></div>
        <div class="dock-top"><p>先把能确认的信息整理出来。点击场景中的四个位置。</p><span class="step-count">${state.found.length} / 4</span></div>
        <div class="found-list">${state.found.map((id) => `<span>${investigationItems[id][0]} · ${investigationItems[id][1]}</span>`).join('')}</div>
        ${state.found.length === 4 ? '<button class="button" id="finishInvestigation" type="button">信息整理好了 →</button>' : ''}
      </div>
    </section>`, { progress: 14 });
  document.querySelectorAll('[data-item]').forEach((button) => button.addEventListener('click', () => {
    const id = button.dataset.item;
    if (!state.found.includes(id)) {
      state.found.push(id);
      adjust({ action: 8 });
      toast(investigationItems[id][1]);
      renderInvestigation();
    }
  }));
  document.getElementById('finishInvestigation')?.addEventListener('click', renderHelpStyleBranch);
}

function renderNarrative(config) {
  const choices = config.choices || [];
  shell(`
    <section class="narrative">
      <div class="narrative-art ${config.art || 'room'}"><span class="art-label">${config.location || '你的视角'}</span></div>
      <div class="narrative-panel">
        <p class="story-time">${config.time || chapters[state.chapter][0]}</p>
        <p class="story-copy">${config.copy}</p>
        ${config.detail ? `<p class="story-detail">${config.detail}</p>` : ''}
        ${config.feedback ? `<div class="feedback-card ${config.feedbackType || ''}"><span>选择之后</span><p>${config.feedback}</p></div>` : ''}
        ${config.continueLabel ? `<button class="button" id="continueStory" type="button">${config.continueLabel} →</button>` : ''}
        ${choices.length ? `<div class="choice-list">${choices.map(buttonChoice).join('')}</div>` : ''}
      </div>
    </section>`, { progress: config.progress });
  document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => config.onChoice(Number(button.dataset.choice))));
  document.getElementById('continueStory')?.addEventListener('click', config.onContinue);
}

function renderHelpStyleBranch() {
  setView('helpStyleBranch', 1);
  const branches = {
    '先自己搜索': {
      art: 'room', location: '搜索框',
      copy: '你没有打开聊天列表，而是先点进了搜索框。',
      detail: '搜索能带来一点掌控感，也可能让人困在无穷无尽的症状和个案里。',
      choices: [
        { text: '输入“感染HIV后多久会发烧”', note: '继续寻找身体会给出的答案', changes: { hours: -4, delay: 4, action: -5 }, result: '四小时过去，页面越开越多。症状仍不能判断感染状态，你却更难停下来。', type: 'warning' },
        { text: '搜索本地正规PEP评估机构', note: '把搜索变成寻找行动入口', changes: { action: 9 }, result: '这次搜索没有试图诊断自己，而是帮你找到了可以继续行动的正规入口。', type: 'good' },
        { text: '先关掉搜索，回看刚整理的信息', note: '把注意力拉回可确认的事实', changes: { action: 5 }, result: '你停下了症状联想，重新看见发生时间、接触方式和防护情况。', type: 'good' },
      ],
    },
    '先问信任的人': {
      art: 'room', location: '聊天列表',
      copy: '你点开最信任的朋友头像，光标在输入框里闪了很久。',
      detail: '向朋友求助可以得到陪伴，但你仍有权决定分享多少。',
      choices: [
        { text: '把完整经过和对方聊天截图都发过去', note: '希望朋友替你判断', changes: { privacy: -10, trust: 3 }, result: '朋友很关心你，但完整截图也让本不需要知道的人看见了他人的经历。', type: 'warning' },
        { text: '只说“我有点慌，能帮我找正规机构吗？”', note: '提出需要，不交出全部隐私', changes: { trust: 9, privacy: 4, action: 6 }, result: '朋友没有追问，只发来了正规机构的联系方式，并问你是否需要陪伴。', type: 'good' },
        { text: '打了很多字，最后全部删掉', note: '害怕解释，只能继续一个人想', changes: { hours: -2, action: -2 }, result: '两小时过去，你没有失去求助的机会，但仍需要选择下一步。', type: 'warning' },
      ],
    },
    '直接找专业机构': {
      art: 'clinic', location: '在线咨询入口',
      copy: '你直接打开了校园健康中心提供的正规咨询入口。',
      detail: '页面没有要求你先说明身份，只提示准备发生时间、接触方式和防护情况。',
      choices: [
        { text: '按下咨询按钮，说明刚整理的信息', note: '先让专业人员了解具体情况', changes: { action: 11 }, result: '你进入了专业评估的入口。工作人员没有下结论，只先确认时间和具体情况。', type: 'good' },
        { text: '记下电话，但决定再想两个小时', note: '入口已经找到，行动仍被推迟', changes: { hours: -2, delay: 2 }, result: '号码留在备忘录里。好在你还可以随时返回，但等待本身不会提供新的医学信息。', type: 'warning' },
        { text: '退出页面，改看网友推荐的药物链接', note: '绕开专业评估寻找快捷答案', changes: { hours: -3, action: -7 }, result: '来路不明的药物信息不能替代专业评估，还消耗了继续行动的时间。', type: 'warning' },
      ],
    },
    '还不确定': {
      art: 'room', location: '凌晨的手机桌面',
      copy: '搜索、聊天、电话和闹钟都在屏幕上，你不知道先点哪一个。',
      detail: '没有固定求助习惯并不是失败，你仍然可以给自己安排一个很小的下一步。',
      choices: [
        { text: '先设一个十分钟计时，只整理行动入口', note: '用一个小步骤结束原地打转', changes: { action: 8 }, result: '十分钟里，你没有要求自己解决全部问题，只找到了下一步该联系谁。', type: 'good' },
        { text: '在几个应用之间反复切换', note: '每个页面都看一点，却没有开始行动', changes: { hours: -4, delay: 4, action: -4 }, result: '信息越来越多，能确认的事实却没有增加。四小时已经过去。', type: 'warning' },
        { text: '先睡一觉，明天再决定', note: '希望醒来后焦虑自然消失', changes: { hours: -12, delay: 12, action: -9 }, result: '一夜过去，焦虑并没有替你作出决定，行动窗口却继续缩短。', type: 'warning' },
      ],
    },
  };
  const branch = branches[state.profile.helpStyle] || branches['还不确定'];
  renderNarrative({
    art: branch.art, location: branch.location, time: '你的第一反应', progress: 17,
    copy: branch.copy, detail: branch.detail, choices: branch.choices,
    onChoice: (index) => {
      const choice = branch.choices[index];
      adjust(choice.changes);
      renderProfileBranchFeedback(choice.result, choice.type, '求助习惯带来的第一步', renderRelationshipBranch, 'helpStyleFeedback');
    },
  });
}

function renderRelationshipBranch() {
  setView('relationshipBranch', 1);
  const branches = {
    '单身': {
      copy: '对方发来一句：“如果专业评估需要我补充什么，你可以说。”',
      detail: '你们没有关系承诺，但仍可以只沟通与这次情况有关的事实。',
      choices: [
        { text: '只确认发生时间、防护情况和意外细节', note: '不要求对方交出身份或检测结果', changes: { trust: 7, action: 5 }, result: '你们把能确认的事实说清楚，没有让关系标签代替风险评估。', type: 'good' },
        { text: '要求对方先证明自己“没有问题”', note: '用身份保证换取安全感', changes: { trust: -13, judgment: 1 }, result: '对话很快变成审问。即使得到一句保证，也不能替代对这次具体情况的评估。', type: 'warning' },
      ],
    },
    '恋爱中': {
      copy: '伴侣打来电话：“你是不是还在担心？我们可以一起把事情说清楚。”',
      detail: '信任让这通电话成为可能，但信任本身不是风险评估工具。',
      choices: [
        { text: '“我有点慌，我们先核对事实，再一起找专业评估。”', note: '承认情绪，也保留行动方向', changes: { trust: 10, action: 6 }, result: '你们没有把担心变成互相指责，而是一起核对了专业评估需要的信息。', type: 'good' },
        { text: '“既然你爱我，你就应该保证我绝对没事。”', note: '让关系承诺代替医学事实', changes: { trust: -15, judgment: 1 }, result: '爱和信任无法提供“绝对没事”的医学保证，这句话也让彼此更难继续沟通。', type: 'warning' },
      ],
    },
    '关系未定义': {
      copy: '你写下一条消息，又迟迟没有发送：谈防护，会不会让这段关系突然变得沉重？',
      detail: '关系可以暂时没有名字，但健康沟通不必等到关系被定义。',
      choices: [
        { text: '“我们先不定义关系，只把防护发生了什么说清楚。”', note: '把健康沟通和关系承诺分开', changes: { trust: 8, action: 5 }, result: '对方回复了具体信息。你们不必先定义关系，也能完成必要沟通。', type: 'good' },
        { text: '当作没有发生，避免让关系变复杂', note: '用回避维持表面的轻松', changes: { hours: -5, delay: 5, trust: -5 }, result: '消息没有发出，关系暂时没有变化，但行动时间也没有停下来。', type: 'warning' },
      ],
    },
    '不设定': {
      copy: '你决定不为这段关系命名，只处理眼前能够确认的事实。',
      detail: '无论关系状态如何，具体接触和防护情况才是专业评估需要的信息。',
      choices: [
        { text: '只询问与这次评估有关的事实', note: '保持最少必要信息', changes: { trust: 6, privacy: 3, action: 5 }, result: '对话停留在必要事实上，没有要求任何人公开更多身份信息。', type: 'good' },
        { text: '继续追问对方过去的全部关系经历', note: '试图从隐私里推断风险', changes: { trust: -12, privacy: -8, judgment: 1 }, result: '过去的关系经历不能替代这次具体评估，追问却让对方不再愿意继续交流。', type: 'warning' },
      ],
    },
  };
  const branch = branches[state.profile.relationship] || branches['不设定'];
  renderNarrative({
    art: 'room', location: '与对方的对话', time: '消息亮起', progress: 19,
    copy: branch.copy, detail: branch.detail, choices: branch.choices,
    onChoice: (index) => {
      const choice = branch.choices[index];
      adjust(choice.changes);
      renderProfileBranchFeedback(choice.result, choice.type, '这段关系中的一次对话', renderExposureDecision, 'relationshipFeedback');
    },
  });
}

function renderProfileBranchFeedback(message, type, label, next, view) {
  setView(view, 1);
  renderNarrative({
    art: 'room', location: label, time: `行动窗口剩余约 ${state.hours} 小时`, progress: 20,
    copy: '故事因为你的处境和选择向前走了一步。',
    feedback: message, feedbackType: type,
    continueLabel: '继续', onContinue: next,
  });
}

function renderExposureDecision() {
  setView('exposureDecision', 1);
  const lens = getProfileLens();
  const options = [
    { text: '继续搜索“感染后最早有什么症状”', note: '也许身体会给出答案' },
    { text: '先等一晚，看身体会不会不舒服', note: '明早再决定是否求助' },
    { text: '带着记录，尽快联系正规专业机构', note: '让专业人员结合具体情况评估' },
  ];
  renderNarrative({
    art: 'room', location: '凌晨的宿舍', time: `距离那一晚约 ${70 - state.hours + 2} 小时`, progress: 20,
    copy: '信息已经整理好了。接下来怎么做，才不会让猜测继续消耗时间？',
    detail: `前面的经历没有替你作出医学判断。${lens.orientation} 现在仍需要根据具体情况开始行动。`,
    choices: options,
    onChoice: (index) => {
      if (index === 0) {
        adjust({ hours: -6, delay: 6, action: -8 });
        renderExposureFeedback('搜索结果列出许多互相矛盾的“早期症状”。六小时过去了，但症状仍不能判断感染状态。', 'warning');
      } else if (index === 1) {
        adjust({ hours: -12, delay: 12, action: -12 });
        renderExposureFeedback('一夜过去，没有症状并不能排除感染。等待身体变化只会消耗PEP的行动窗口。', 'warning');
      } else {
        state.professionalHelp = true;
        adjust({ action: 22 });
        renderExposureFeedback('你把发生时间、接触方式和防护情况告诉了专业人员。是否需要PEP将由专业人员评估，而不是由游戏或搜索结果下结论。', 'good', true);
      }
    },
  });
}

function renderExposureFeedback(message, type, completed = false) {
  setView(completed ? 'exposureComplete' : 'exposureFeedback', 1);
  renderNarrative({
    art: 'room', location: '手机屏幕前', time: completed ? '行动已经开始' : `行动窗口剩余约 ${state.hours} 小时`, progress: completed ? 25 : 21,
    copy: completed ? '你没有试图靠猜测得到确定答案。' : '这个选择带来了实际后果。',
    feedback: message, feedbackType: type,
    continueLabel: completed ? '进入第二章' : '重新决定下一步',
    onContinue: completed ? startTransmissionChapter : renderExposureDecision,
  });
}

function startTransmissionChapter() {
  state.sortIndex = 0;
  state.sorted = [];
  setView('transmission', 2);
  renderTransmission();
}

function renderTransmission(feedback = '') {
  setView('transmission', 2);
  const card = transmissionCards[state.sortIndex];
  if (!card) return renderTransmissionComplete();
  shell(`
    <section class="tool-view">
      <div class="view-head"><div><p class="eyebrow">校园信息整理</p><h3>这句话应该放在哪里？</h3><p>拖动卡片到分类区；在手机上也可以直接点击分类。</p></div><span class="step-count">${state.sortIndex + 1} / ${transmissionCards.length}</span></div>
      <div class="card-sort">
        <article class="prompt-card" draggable="true" id="transmissionCard"><div><span>待判断的情境</span><h4>${card.title}</h4></div><p>${card.detail}</p></article>
        <div class="sort-zones">
          <button class="sort-zone" type="button" data-zone="route"><i>1</i><b>真实传播相关情境</b><small>涉及特定体液和有效接触方式</small></button>
          <button class="sort-zone" type="button" data-zone="daily"><i>2</i><b>不会传播的日常接触</b><small>不需要隔离或恐慌</small></button>
          <button class="sort-zone" type="button" data-zone="consult"><i>3</i><b>需要补充信息并咨询</b><small>仅凭一句描述无法判断</small></button>
          <div class="sort-progress"><span>${feedback || '不是背定义，而是知道什么时候不必害怕、什么时候应该求助。'}</span><span>${state.sortIndex} 张已整理</span></div>
        </div>
      </div>
    </section>`, { progress: 28 + state.sortIndex * 2.7 });
  const zones = document.querySelectorAll('[data-zone]');
  const submit = (zone) => {
    const correct = zone === card.answer;
    if (!correct) adjust({ action: -2 });
    state.sorted.push({ title: card.title, zone, correct });
    state.sortIndex += 1;
    saveState();
    toast(correct ? card.fact : `这个分类容易造成误解。${card.fact}`);
    renderTransmission(correct ? card.fact : `重新理解：${card.fact}`);
  };
  zones.forEach((zone) => {
    zone.addEventListener('click', () => submit(zone.dataset.zone));
    zone.addEventListener('dragover', (event) => { event.preventDefault(); zone.classList.add('active'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('active'));
    zone.addEventListener('drop', (event) => { event.preventDefault(); submit(zone.dataset.zone); });
  });
  document.getElementById('transmissionCard').addEventListener('dragstart', (event) => event.dataTransfer.setData('text/plain', card.title));
}

function renderTransmissionComplete() {
  setView('transmissionComplete', 2);
  const lens = getProfileLens();
  renderNarrative({
    art: 'campus', location: '第二天 · 校园', time: '第二章完成', progress: 47,
    copy: '恐慌常常来自把“接触”两个字想得太宽。',
    detail: 'HIV有明确的传播条件。共同进餐、拥抱、握手和蚊虫叮咬不会传播；涉及血液或性接触的具体情境，则应基于事实进行评估。',
    feedback: `关系身份、外表和道德评价都不是传播途径。${lens.orientation}`, feedbackType: 'good',
    continueLabel: '进入第三章', onContinue: renderIdentityAccessBranch,
  });
}

function renderIdentityAccessBranch() {
  setView('identityAccessBranch', 3);
  const orientationContext = {
    '异性恋': '工作人员没有因为这是异性关系就默认“没有风险”，也没有夸大风险。',
    '同性恋': '工作人员只询问具体接触和防护，没有要求你为性取向辩解。',
    '双性恋 / 泛性恋': '工作人员没有用一个标签猜测伴侣，也没有让性取向代替具体评估。',
    '不设定': '工作人员说明：无需公开性取向，只需要提供与这次接触有关的信息。',
  }[state.profile.orientation] || '';
  const branches = {
    '女生': {
      copy: '走到咨询入口时，你最担心的不是流程，而是会不会先被问“为什么没有保护好自己”。',
      detail: `${orientationContext} 咨询页上写着：这里不作道德评价。`,
      choices: [
        { text: '继续预约，只提供评估需要的信息', changes: { action: 6, privacy: 3 }, result: '接待人员先确认时间和防护情况，没有评价你的选择。你不需要先证明自己“足够谨慎”。', type: 'good' },
        { text: '因为害怕被评价，先退出页面', changes: { hours: -3, delay: 3, action: -3 }, result: '三小时后，你从正规说明里确认了这里的隐私原则，重新回到预约入口。', type: 'warning' },
      ],
    },
    '男生': {
      copy: '你在咨询框里三次输入“我有点害怕”，又三次删掉。',
      detail: `${orientationContext} 表达害怕不会改变事实，却能让专业人员知道你需要怎样的支持。`,
      choices: [
        { text: '直接说明：“我很焦虑，也想了解下一步。”', changes: { action: 7, trust: 3 }, result: '对方先回应了你的实际问题，也告诉你焦虑并不需要独自承担。', type: 'good' },
        { text: '只说“替朋友问问”，隐藏自己的需要', changes: { action: -2 }, result: '工作人员仍提供了正规入口，但模糊的信息让沟通多绕了一圈。你最后补充了真实情况。', type: 'warning' },
      ],
    },
    '非二元 / 其他': {
      copy: '预约表上的“称谓”是选填项，也允许自行填写。',
      detail: `${orientationContext} 你不需要先完成一场身份说明，才能获得健康服务。`,
      choices: [
        { text: '填写自己舒适的称谓，继续预约', changes: { action: 6, trust: 4 }, result: '后续沟通使用了你填写的称谓，话题随后回到实际需要和专业安排。', type: 'good' },
        { text: '暂时留空，继续预约', changes: { action: 6, privacy: 4 }, result: '称谓保持空白也没有妨碍服务。身份信息由你决定是否表达。', type: 'good' },
      ],
    },
    '不设定': {
      copy: '预约表明确标注：称谓与性取向可以不填写。',
      detail: `${orientationContext} 你选择把注意力留给此刻真正需要处理的事情。`,
      choices: [
        { text: '留空并继续预约', changes: { action: 6, privacy: 5 }, result: '页面顺利进入下一步。获得帮助不以公开身份为前提。', type: 'good' },
        { text: '填写一个临时称谓再继续', changes: { action: 5, privacy: 3 }, result: '你选择了当下舒适的表达方式，健康服务没有要求更多解释。', type: 'good' },
      ],
    },
  };
  const branch = branches[state.profile.identity] || branches['不设定'];
  renderNarrative({
    art: 'clinic', location: '检测咨询入口', time: '第三章 · 到达之前', progress: 49,
    copy: branch.copy, detail: branch.detail, choices: branch.choices.map((choice) => ({ text: choice.text })),
    onChoice: (index) => {
      const choice = branch.choices[index];
      adjust(choice.changes);
      setView('identityAccessFeedback', 3);
      renderNarrative({
        art: 'clinic', location: '咨询入口', time: '一次真实的求助体验', progress: 50,
        copy: '身份改变了你走到这里时的顾虑，但没有改变专业评估依据。',
        feedback: choice.result, feedbackType: choice.type,
        continueLabel: '继续了解检测', onContinue: renderKnowledgeBranch,
      });
    },
  });
}

function renderKnowledgeBranch() {
  setView('knowledgeBranch', 3);
  const branches = {
    '第一次了解': {
      copy: '三个词第一次同时出现在你面前：PrEP、PEP和HIV检测。',
      detail: '你需要先找出“潜在暴露后，应尽快接受专业评估”的那一项。',
      choices: [
        { text: 'PrEP', note: '暴露前预防' },
        { text: 'PEP', note: '潜在暴露后的紧急预防' },
        { text: 'HIV检测', note: '了解感染状态' },
      ],
      correct: 1,
      success: '你把时间顺序理清了：PrEP用于暴露前，PEP用于潜在暴露后，检测用于了解感染状态。',
      retry: '这些措施处于不同阶段。当前题目问的是潜在暴露后的紧急预防，因此是PEP。',
    },
    '看过一些科普': {
      copy: '你记得“窗口期”这个词，于是想把网上看到的某个天数直接套到自己身上。',
      detail: '检测方法和具体情况不同，应该怎样处理？',
      choices: [
        { text: '只记一个网上看到的天数', note: '所有情况都使用同一时间点' },
        { text: '按专业建议安排检测和必要复查', note: '结合检测方法与具体情况' },
        { text: '等出现症状再决定', note: '让身体感觉替代检测' },
      ],
      correct: 1,
      success: '你没有把一个数字套给所有人，而是保留了专业人员根据具体情况安排检测和复查的空间。',
      retry: '窗口期并不是一个能脱离检测方法和具体情况套用的万能数字，也不能靠症状代替检测。',
    },
    '参加过培训': {
      copy: '熟悉的知识到了自己身上，突然不像课堂里那么整齐。',
      detail: '一次检测结果能否自动结束所有后续安排？',
      choices: [
        { text: '可以，任何一次检测都足够', note: '忽略检测时间与专业安排' },
        { text: '不能一概而论，应完成建议的检测和复查', note: '把知识放回具体情境' },
        { text: '只要没有症状就可以结束', note: '用症状替代结果解释' },
      ],
      correct: 1,
      success: '你没有因为学过知识就替自己下结论，而是把解释交回具体检测时间和专业建议。',
      retry: '培训知识提供判断框架，却不能替代个体化安排；一次检测是否足够需要结合时间和专业建议。',
    },
    '不确定': {
      copy: '信息很多，你决定先抓住一个不会错的行动原则。',
      detail: '哪一句最适合成为接下来检测安排的起点？',
      choices: [
        { text: '没有症状就不需要检测' },
        { text: '检测等于已经感染' },
        { text: '按专业建议检测，不用靠症状猜测' },
      ],
      correct: 2,
      success: '你不需要一次记住全部术语，先记住不靠症状猜测、按专业建议检测就够了。',
      retry: '检测是一种了解状态的工具，不等于已经感染；没有症状也不能排除感染。',
    },
  };
  const branch = branches[state.profile.knowledge] || branches['不确定'];
  renderNarrative({
    art: 'campus', location: '你的知识路径', time: '进入检测章节', progress: 51,
    copy: branch.copy, detail: branch.detail, choices: branch.choices,
    onChoice: (index) => {
      const correct = index === branch.correct;
      adjust(correct ? { action: 5 } : { action: -2 });
      setView('knowledgeFeedback', 3);
      renderNarrative({
        art: 'campus', location: '信息重新排好顺序', time: '知识进入情境', progress: 52,
        copy: correct ? '你找到了适合自己的理解入口。' : '这次没有停在“答错”上。',
        feedback: correct ? branch.success : branch.retry,
        feedbackType: correct ? 'good' : 'warning',
        continueLabel: '考虑检测安排', onContinue: renderTestingQuestion,
      });
    },
  });
}

function renderTestingQuestion() {
  setView('testingQuestion', 3);
  const lens = getProfileLens();
  renderNarrative({
    art: 'campus', location: '校园路上', time: '几天后', progress: 50,
    copy: '焦虑没有立刻消失。你开始想：“我现在没有任何不舒服，还需要检测吗？”',
    detail: `${lens.knowledge} ${lens.testing}`,
    choices: [
      { text: '没有症状就先不检测', note: '把身体感觉当作结果' },
      { text: '只做一次自测，以后都不用管', note: '希望一次操作结束全部不确定' },
      { text: '按专业建议预约检测与必要复查', note: '用检测了解感染状态' },
    ],
    onChoice: (index) => {
      if (index === 2) {
        adjust({ action: 12 });
        renderTestingFeedback('你预约了正规检测。检测是了解感染状态的方式，不代表你已经感染；具体检测与复查时间应听取专业建议。', 'good');
      } else {
        adjust({ action: -5, delay: 3 });
        const message = index === 0
          ? '没有症状不能排除感染，身体感觉不能代替检测。'
          : '一次自行检测不能替代专业人员根据时间和具体情况给出的检测、复查建议。';
        renderTestingFeedback(message, 'warning');
      }
    },
  });
}

function renderTestingFeedback(message, type) {
  setView('testingFeedback', 3);
  renderNarrative({
    art: 'clinic', location: '正规检测机构', time: '预约页面', progress: 55,
    copy: type === 'good' ? '预约确认出现在手机上。' : '你重新打开了专业人员给出的检测安排。',
    feedback: message, feedbackType: type,
    continueLabel: type === 'good' ? '前往检测机构' : '重新考虑检测',
    onContinue: type === 'good' ? renderTestingPrivacy : renderTestingQuestion,
  });
}

function renderTestingPrivacy() {
  setView('testingPrivacy', 3);
  shell(`
    <section class="view">
      <div class="view-head"><div><p class="eyebrow">预约完成</p><h3>检测不需要向所有人解释</h3><p>故事不会显示你的检测结果，也不会暗示结果是什么。</p></div></div>
      <div class="phone-wrap">
        <div>
          <article class="appointment-card"><div class="date"><b>16</b><span>周三</span></div><div><h4>健康咨询与检测预约</h4><p>正规检测机构 · 具体安排以机构通知为准</p></div><span>已预约</span></article>
          <div class="narrative-art clinic" style="min-height:330px;margin-top:12px"><span class="art-label">候诊区 · 你的信息受到保护</span></div>
        </div>
        <div class="reply-panel">
          <h4>室友问你去哪儿</h4>
          <p>你可以自行决定分享多少。检测和结果都属于个人健康隐私。</p>
          <div class="choice-list">
            <button class="choice" data-privacy-choice="0" type="button"><b>“去处理一点健康方面的事，回来再聊。”</b><small>保留自己的解释边界</small></button>
            <button class="choice" data-privacy-choice="1" type="button"><b>把全部经历和预约截图发过去</b><small>希望通过公开细节换取安慰</small></button>
            <button class="choice" data-privacy-choice="2" type="button"><b>“我去做检测，所以我可能已经感染了。”</b><small>把检测当作感染结论</small></button>
          </div>
        </div>
      </div>
    </section>`, { progress: 59 });
  document.querySelectorAll('[data-privacy-choice]').forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.privacyChoice);
    if (index === 0) {
      adjust({ privacy: 8, action: 5 });
      renderTestingClose('你保留了自己的边界。你可以向信任的人求助，也可以只说实际需要，不必公开全部经历。', 'good');
    } else if (index === 1) {
      adjust({ privacy: -12 });
      renderTestingClose('分享自己的信息是你的权利，但焦虑中一次性公开全部细节可能带来之后无法收回的隐私风险。', 'warning');
    } else {
      adjust({ judgment: 1, action: -3 });
      renderTestingClose('检测不等于已经感染。把预约说成感染结论，会让自己和他人承担不必要的恐惧。', 'warning');
    }
  }));
}

function renderTestingClose(message, type) {
  setView('testingComplete', 3);
  renderNarrative({
    art: 'clinic', location: '检测机构外', time: '第三章完成', progress: 63,
    copy: '门在身后合上，故事没有展示任何检测结果。',
    detail: '因为结果属于你，也因为任何人都不应该通过故事线索猜测他人的感染状态。',
    feedback: message, feedbackType: type,
    continueLabel: '进入第四章', onContinue: renderFriendMessage,
  });
}

function renderFriendMessage() {
  setView('friendMessage', 4);
  shell(`
    <section class="view">
      <div class="view-head"><div><p class="eyebrow">一周后</p><h3>朋友发来三条消息</h3><p>对方没有说明原因，也没有义务说明。</p></div></div>
      <div class="phone-wrap">
        <div class="phone">
          <div class="phone-head"><i></i><div><b>林野</b><small>刚刚在线</small></div></div>
          <div class="messages">
            <div class="bubble">这周能陪我去一趟检测吗？</div>
            <div class="bubble">没什么大事，我只是想确认一下。</div>
            <div class="bubble">我不太想解释原因，也不想让别人知道。</div>
          </div>
          <div class="phone-input">选择一条回复…</div>
        </div>
        <div class="reply-panel">
          <h4>你准备怎么回复？</h4>
          <p>支持的第一步，是先回应对方实际提出的需要。</p>
          <div class="choice-list">
            <button class="choice" data-friend-choice="0" type="button"><b>“好，我陪你去。你不用现在解释。”</b></button>
            <button class="choice" data-friend-choice="1" type="button"><b>“是不是发生了什么高风险的事？”</b></button>
            <button class="choice" data-friend-choice="2" type="button"><b>“你是不是感染HIV了？”</b></button>
            <button class="choice" data-friend-choice="3" type="button"><b>“我先告诉其他人，让大家一起关心你。”</b></button>
          </div>
        </div>
      </div>
    </section>`, { progress: 67 });
  document.querySelectorAll('[data-friend-choice]').forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.friendChoice);
    if (index === 0) {
      adjust({ trust: 14, privacy: 6, action: 8 });
      renderFriendFeedback('“谢谢。那我约好时间告诉你。” 对方继续留在了对话里。陪伴不等于有权知道原因或结果。', 'good');
    } else if (index === 1) {
      adjust({ trust: -8, privacy: -4 });
      renderFriendFeedback('对方沉默了一会儿：“我现在不想说这些。” 追问没有帮助预约，反而让求助变得更难。', 'warning');
    } else if (index === 2) {
      adjust({ trust: -18, judgment: 1 });
      renderFriendFeedback('聊天窗口很久没有出现新消息。检测不等于感染，把两者直接画等号会制造恐惧。', 'warning');
    } else {
      adjust({ trust: -22, privacy: -22, judgment: 1 });
      renderFriendFeedback('“不要告诉别人。” 对方撤回了预约信息。关心不能越过知情同意。', 'warning');
    }
  }));
}

function renderFriendFeedback(message, type) {
  setView('friendFeedback', 4);
  renderNarrative({
    art: 'campus', location: '聊天窗口', time: '消息发送后', progress: 71,
    copy: '一句回复，决定了对方是否还愿意继续求助。',
    feedback: message, feedbackType: type,
    continueLabel: '继续这段对话', onContinue: renderScreenshotDecision,
  });
}

function renderScreenshotDecision() {
  setView('screenshotDecision', 4);
  renderNarrative({
    art: 'campus', location: '校园长椅', time: '朋友去检测的前一天', progress: 73,
    copy: '你想向另一个朋友请教路线。你已经遮住了聊天截图里的姓名和头像。',
    detail: '但截图仍保留了独特的说话方式、时间、地点和完整经历。',
    choices: [
      { text: '把截图发过去，反正已经遮住姓名', note: '用完整故事换取路线信息' },
      { text: '只询问机构地址，不转发任何聊天内容', note: '只分享完成任务所需的最少信息' },
      { text: '发到群里，让更多人一起判断', note: '扩大传播范围' },
    ],
    onChoice: (index) => {
      if (index === 1) {
        adjust({ privacy: 12, trust: 8 });
        state.sharedStory = false;
        renderChapterFourClose('你只问了机构地址。朋友的故事没有离开你们的对话。', 'good');
      } else {
        adjust({ privacy: index === 0 ? -20 : -32, trust: index === 0 ? -12 : -20 });
        state.sharedStory = true;
        saveState();
        renderChapterFourClose('姓名和头像被遮住了，但熟悉上下文的人仍可能认出对方。隐去名字不等于真正匿名。', 'warning');
      }
    },
  });
}

function renderChapterFourClose(message, type) {
  setView('friendComplete', 4);
  renderNarrative({
    art: 'clinic', location: '检测机构门口', time: '第四章完成', progress: 76,
    copy: '你陪朋友走到了门口，然后在约好的地方等候。',
    detail: '故事没有展示朋友的检测结果。陪伴已经完成，不需要用结果来证明。',
    feedback: message, feedbackType: type,
    continueLabel: '进入第五章', onContinue: startPlan,
  });
}

function startPlan() {
  if (!state.planAdded.length) state.planSelected = '';
  setView('plan', 5);
  renderPlan();
}

function renderPlan() {
  setView('plan', 5);
  const lens = getProfileLens();
  const phaseNames = { before: '暴露前', after: '潜在暴露后', confirm: '确认感染状态' };
  shell(`
    <section class="tool-view">
      <div class="view-head"><div><p class="eyebrow">个人预防计划</p><h3>下一次，可以更早行动</h3><p>先点击一张行动卡，再点击它所属的阶段。预防不是单一措施，而是一组可以提前准备的行动。</p></div><span class="step-count">${state.planAdded.length} / ${planItems.length}</span></div>
      <div class="perspective-note plan-perspective"><b>与你有关</b><span>${lens.relationship.plan}</span></div>
      <div class="plan-board">
        ${Object.entries(phaseNames).map(([phase, label]) => `
          <button class="plan-column" type="button" data-phase="${phase}">
            <span>阶段</span><h4>${label}</h4>
            <div class="plan-items">${state.planAdded.filter((id) => planItems.find((item) => item.id === id)?.phase === phase).map((id) => `<div class="plan-item">${planItems.find((item) => item.id === id).title}</div>`).join('')}</div>
          </button>`).join('')}
      </div>
      <div class="action-pool">
        ${planItems.map((item) => `<button class="action-card ${state.planAdded.includes(item.id) ? 'added' : ''} ${state.planSelected === item.id ? 'selected' : ''}" type="button" data-plan-item="${item.id}" ${state.planAdded.includes(item.id) ? 'disabled' : ''}><b>${item.title}</b><small>${state.planSelected === item.id ? '已选中，请点击上方阶段' : '选择这张行动卡'}</small></button>`).join('')}
      </div>
      ${state.planAdded.length === planItems.length ? '<button class="button" id="finishPlan" type="button" style="margin-top:15px">计划完成 →</button>' : ''}
    </section>`, { progress: 79 + state.planAdded.length * 1.5 });
  document.querySelectorAll('[data-plan-item]').forEach((button) => button.addEventListener('click', () => {
    state.planSelected = button.dataset.planItem;
    saveState();
    renderPlan();
  }));
  document.querySelectorAll('[data-phase]').forEach((button) => button.addEventListener('click', () => {
    if (!state.planSelected) return toast('先从下方选择一张行动卡。');
    const item = planItems.find((candidate) => candidate.id === state.planSelected);
    if (item.phase !== button.dataset.phase) {
      adjust({ action: -1 });
      return toast(`再想想时间顺序：“${item.title}”不属于这个阶段。`);
    }
    state.planAdded.push(item.id);
    state.planSelected = '';
    adjust({ action: 4 });
    renderPlan();
  }));
  document.getElementById('finishPlan')?.addEventListener('click', renderPepFollowup);
}

function renderPepFollowup() {
  setView('pepFollowup', 5);
  const lens = getProfileLens();
  renderNarrative({
    art: 'room', location: '计划里的情境练习', time: '假设已由专业人员评估并启动PEP', progress: 91,
    copy: '如果服药期间漏服一次或出现不适，应该怎么做？',
    detail: `${lens.pep} 这是情境练习，不代表任何角色已经感染，也不提供个体用药方案。`,
    choices: [
      { text: '自行停药，等身体恢复后再说', note: '中断专业方案' },
      { text: '下一次擅自加倍剂量', note: '自行改变用药' },
      { text: '及时联系专业人员，按其指导处理', note: '说明漏服或不适的具体情况' },
    ],
    onChoice: (index) => {
      if (index === 2) {
        adjust({ action: 8 });
        renderPepClose('如启动PEP，通常需要连续服用28天，具体遵医嘱。漏服或出现不适时，应及时咨询专业人员，不自行停药、换药或加量。', 'good');
      } else {
        adjust({ medicationMistakes: 1, action: -5 });
        renderPepClose('自行停药或加量都可能破坏专业方案。应尽快说明情况并咨询专业人员，完成用药后仍需按建议检测和复查。', 'warning');
      }
    },
  });
}

function renderPepClose(message, type) {
  setView('planComplete', 5);
  renderNarrative({
    art: 'room', location: '你的预防计划', time: '第五章完成', progress: 93,
    copy: '计划被保存下来：暴露前准备，潜在暴露后及时行动，用检测确认状态。',
    feedback: message, feedbackType: type,
    continueLabel: '进入第六章', onContinue: startSocial,
  });
}

function startSocial() {
  if (state.view !== 'social') state.socialIndex = 0;
  setView('social', 6);
  renderSocial();
}

function renderSocial(feedback = '') {
  setView('social', 6);
  const item = socialPosts[state.socialIndex];
  if (!item) return finishGame();
  shell(`
    <section class="view">
      <div class="view-head"><div><p class="eyebrow">校园话题广场</p><h3>你会怎么说？</h3><p>回应事实，也回应这些话可能给真实的人带来的压力。</p></div><span class="step-count">${state.socialIndex + 1} / ${socialPosts.length}</span></div>
      <div class="phone-wrap">
        <article class="post">
          <div class="post-head"><span class="post-avatar">问</span><div><b>校园树洞 · 匿名</b><small>刚刚发布</small></div></div>
          <p>${item.post}</p>
          ${feedback ? `<div class="reply-preview">${feedback}</div>` : ''}
        </article>
        <div class="reply-panel"><h4>选择一条回应</h4><p>不公开任何人的经历，只说明必要的科学事实和支持方向。</p><div class="choice-list">${item.options.map(buttonChoice).join('')}</div></div>
      </div>
    </section>`, { progress: 94 + state.socialIndex * 1.3 });
  document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => {
    const option = item.options[Number(button.dataset.choice)];
    if (option.good) adjust({ action: 5 });
    else adjust({ judgment: 1, trust: -4 });
    state.history.push({ post: item.post, reply: option.text, good: Boolean(option.good) });
    state.socialIndex += 1;
    saveState();
    toast(option.reply);
    renderSocial(option.reply);
  }));
}

function finishGame() {
  setView('ending', 6);
  const lens = getProfileLens();
  let ending;
  if (state.judgment >= 4 || state.trust < 35) {
    ending = {
      mark: '离', title: '对方已离线',
      copy: '不断追问、替别人下结论或使用污名化语言，让求助者不再愿意继续交流。支持不是获得真相的权利，而是让对方仍有选择。',
      tags: ['先回应需要', '不追问隐私', '不把风险道德化'],
    };
  } else if (state.delay >= 18) {
    ending = {
      mark: '搜', title: '搜索结果没有尽头',
      copy: '症状搜索带来了更多矛盾答案，也消耗了行动时间。无法确定时，记录事实并尽快接受专业评估，比等待身体变化更重要。',
      tags: ['不靠症状判断', '72小时行动窗口', '专业评估'],
    };
  } else if (state.medicationMistakes >= 1) {
    ending = {
      mark: '药', title: '拿到药以后',
      copy: '开始PEP不是行动的终点。规范服药、及时咨询漏服或不适，并按建议完成检测和复查，同样重要。',
      tags: ['通常连续28天', '不自行调整', '按建议复查'],
    };
  } else if (state.sharedStory || state.privacy < 58) {
    ending = {
      mark: '隐', title: '名字遮住了，故事没有',
      copy: '姓名和头像不是一个人唯一的身份线索。时间、地点、说话方式和经历组合起来，仍可能让熟悉的人认出对方。',
      tags: ['最少必要信息', '知情同意', '不替别人公开'],
    };
  } else {
    ending = {
      mark: '行', title: '及时行动',
      copy: '你记录了必要信息，在行动窗口内寻求专业帮助，也在朋友和公共讨论中守住了隐私与尊重。科学信息终于没有被恐惧挡住。',
      tags: ['及时行动', '科学预防', '尊重隐私', '拒绝污名'],
    };
  }
  shell(`
    <section class="ending">
      <div class="ending-grid">
        <div>
          <div class="ending-mark">${ending.mark}</div>
          <p class="eyebrow" style="margin-top:18px">你的故事结局</p>
          <h3>${ending.title}</h3>
          <p class="ending-copy">${ending.copy}</p>
          <div class="ending-tags">${ending.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
          <aside class="perspective-recap">
            <span>本局视角</span>
            <b>${[state.profile.identity, state.profile.orientation, state.profile.relationship, state.profile.helpStyle, state.profile.knowledge].filter(Boolean).join(' · ')}</b>
            <p>${lens.identity} ${lens.relationship.thought}</p>
            <small>它们改变了你经历焦虑、沟通和求助的方式，但从未改变医学事实。</small>
          </aside>
          <button class="button" id="replayButton" type="button">用不同选择再玩一次 ↻</button>
        </div>
        <div class="review">
          <h4>带走这六件事</h4>
          <div class="review-list">
            <div class="review-item"><i>1</i><div><b>暴露不等于感染</b><p>记录时间、接触方式和防护情况，尽快寻求专业评估。</p></div></div>
            <div class="review-item"><i>2</i><div><b>72小时不是等待时间</b><p>PEP越早评估越好，最迟不超过潜在暴露后72小时。</p></div></div>
            <div class="review-item"><i>3</i><div><b>不能依靠症状判断</b><p>感染状态需要通过检测了解，并按专业建议复查。</p></div></div>
            <div class="review-item"><i>4</i><div><b>日常接触不会传播</b><p>共同进餐、拥抱、握手和蚊虫叮咬不会传播HIV。</p></div></div>
            <div class="review-item"><i>5</i><div><b>预防发生在不同阶段</b><p>安全套和PrEP用于暴露前；PEP用于潜在暴露后的紧急预防。</p></div></div>
            <div class="review-item"><i>6</i><div><b>隐私也是支持的一部分</b><p>检测不是道德评价，不替别人公开经历和健康信息。</p></div></div>
          </div>
          <p class="closing-quote">不先追问你是谁，先帮助你开始行动。</p>
        </div>
      </div>
    </section>`, { progress: 100 });
  document.getElementById('replayButton').addEventListener('click', resetGame);
}

function renderCurrent() {
  const routes = {
    cover: renderCover,
    profile: renderProfile,
    investigation: renderInvestigation,
    helpStyleBranch: renderHelpStyleBranch,
    relationshipBranch: renderRelationshipBranch,
    helpStyleFeedback: renderRelationshipBranch,
    relationshipFeedback: renderExposureDecision,
    exposureDecision: renderExposureDecision,
    exposureFeedback: renderExposureDecision,
    exposureComplete: () => renderExposureFeedback('你把发生时间、接触方式和防护情况告诉了专业人员。是否需要PEP将由专业人员评估。', 'good', true),
    transmission: renderTransmission,
    transmissionComplete: renderTransmissionComplete,
    identityAccessBranch: renderIdentityAccessBranch,
    identityAccessFeedback: renderKnowledgeBranch,
    knowledgeBranch: renderKnowledgeBranch,
    knowledgeFeedback: renderTestingQuestion,
    testingQuestion: renderTestingQuestion,
    testingFeedback: renderTestingQuestion,
    testingPrivacy: renderTestingPrivacy,
    testingComplete: () => renderTestingClose('你保留了自己的边界，也没有把检测当成感染结论。', 'good'),
    friendMessage: renderFriendMessage,
    friendFeedback: renderFriendMessage,
    screenshotDecision: renderScreenshotDecision,
    friendComplete: () => renderChapterFourClose('陪伴不要求对方交出经历或检测结果。', 'good'),
    plan: renderPlan,
    pepFollowup: renderPepFollowup,
    planComplete: () => renderPepClose('计划已保存。具体用药与随访安排仍应遵循专业建议。', 'good'),
    social: renderSocial,
    ending: finishGame,
  };
  (routes[state.view] || renderCover)();
}

function resetGame() {
  state = freshState();
  localStorage.removeItem(STORAGE_KEY);
  document.getElementById('restartDialog').close();
  renderCover();
}

document.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
document.getElementById('confirmRestart').addEventListener('click', resetGame);

renderCover();
