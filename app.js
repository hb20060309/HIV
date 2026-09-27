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
  shell(`
    <section class="scene-view">
      <div class="scene-canvas room">
        <div class="scene-caption"><span>凌晨 00:46 · 宿舍</span><p>回到房间后，你越想越不确定：刚才的安全套是不是破了？</p></div>
        ${Object.keys(investigationItems).map((id) => `<button class="hotspot ${state.found.includes(id) ? 'done' : ''}" type="button" data-item="${id}" aria-label="查看${investigationItems[id][0]}">${state.found.includes(id) ? '✓' : '+'}</button>`).join('')}
      </div>
      <div class="scene-dock">
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
  document.getElementById('finishInvestigation')?.addEventListener('click', renderExposureDecision);
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

function renderExposureDecision() {
  setView('exposureDecision', 1);
  const helpHint = state.profile.helpStyle === '先自己搜索'
    ? '你平时习惯先搜索，这次搜索框也最先出现在脑海里。'
    : state.profile.helpStyle === '直接找专业机构'
      ? '你平时更愿意直接求助，但真正拿起手机时仍会犹豫。'
      : '你盯着手机，几种做法同时浮现在脑海里。';
  const options = [
    { text: '继续搜索“感染后最早有什么症状”', note: '也许身体会给出答案' },
    { text: '追问对方“你确定自己没有HIV吗？”', note: '希望从对方身份得到保证' },
    { text: '先等一晚，看身体会不会不舒服', note: '明早再决定是否求助' },
    { text: '带着记录，尽快联系正规专业机构', note: '让专业人员结合具体情况评估' },
  ];
  renderNarrative({
    art: 'room', location: '凌晨的宿舍', time: `距离那一晚约 ${70 - state.hours + 2} 小时`, progress: 20,
    copy: '信息已经整理好了。接下来怎么做，才不会让猜测继续消耗时间？',
    detail: `${helpHint} 暴露不等于感染，伴侣的身份也不能代替具体风险评估。`,
    choices: options,
    onChoice: (index) => {
      if (index === 0) {
        adjust({ hours: -6, delay: 6, action: -8 });
        renderExposureFeedback('搜索结果列出许多互相矛盾的“早期症状”。六小时过去了，但症状仍不能判断感染状态。', 'warning');
      } else if (index === 1) {
        adjust({ trust: -12, privacy: -5, judgment: 1 });
        renderExposureFeedback('对方感到自己正在被审问。即使对方回答，也不能用身份或一句自述替代对这次具体情况的专业评估。', 'warning');
      } else if (index === 2) {
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
  renderNarrative({
    art: 'campus', location: '第二天 · 校园', time: '第二章完成', progress: 47,
    copy: '恐慌常常来自把“接触”两个字想得太宽。',
    detail: 'HIV有明确的传播条件。共同进餐、拥抱、握手和蚊虫叮咬不会传播；涉及血液或性接触的具体情境，则应基于事实进行评估。',
    feedback: '关系身份、外表和道德评价都不是传播途径。把这些与HIV绑定，只会制造污名。', feedbackType: 'good',
    continueLabel: '进入第三章', onContinue: renderTestingQuestion,
  });
}

function renderTestingQuestion() {
  setView('testingQuestion', 3);
  renderNarrative({
    art: 'campus', location: '校园路上', time: '几天后', progress: 50,
    copy: '焦虑没有立刻消失。你开始想：“我现在没有任何不舒服，还需要检测吗？”',
    detail: '专业人员已经说明了检测与复查安排，但搜索结果又让你动摇。',
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
  const phaseNames = { before: '暴露前', after: '潜在暴露后', confirm: '确认感染状态' };
  shell(`
    <section class="tool-view">
      <div class="view-head"><div><p class="eyebrow">个人预防计划</p><h3>下一次，可以更早行动</h3><p>先点击一张行动卡，再点击它所属的阶段。预防不是单一措施，而是一组可以提前准备的行动。</p></div><span class="step-count">${state.planAdded.length} / ${planItems.length}</span></div>
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
  renderNarrative({
    art: 'room', location: '计划里的情境练习', time: '假设已由专业人员评估并启动PEP', progress: 91,
    copy: '如果服药期间漏服一次或出现不适，应该怎么做？',
    detail: '这是情境练习，不代表本故事中的任何角色已经感染，也不提供个体用药方案。',
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
    exposureDecision: renderExposureDecision,
    exposureFeedback: renderExposureDecision,
    exposureComplete: () => renderExposureFeedback('你把发生时间、接触方式和防护情况告诉了专业人员。是否需要PEP将由专业人员评估。', 'good', true),
    transmission: renderTransmission,
    transmissionComplete: renderTransmissionComplete,
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
