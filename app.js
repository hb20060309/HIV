const chapters = [
  { number: '第一章', title: '凌晨的消息' },
  { number: '第二章', title: '倒计时开始' },
  { number: '第三章', title: '找到入口' },
  { number: '第四章', title: '第28天' },
  { number: '第五章', title: '下一次可以更早' },
  { number: '第六章', title: '发出去之前' },
];

const state = {
  chapter: 0,
  hours: 70,
  support: 50,
  privacy: 70,
  delay: 0,
  judgment: 0,
  medicationMistakes: 0,
  correctMatches: 0,
  prepAnswers: {},
};

const els = {
  chapterList: document.getElementById('chapterList'),
  chapterNumber: document.getElementById('chapterNumber'),
  chapterTitle: document.getElementById('chapterTitle'),
  progressBar: document.getElementById('progressBar'),
  chatLog: document.getElementById('chatLog'),
  interactionDock: document.getElementById('interactionDock'),
  dockLabel: document.getElementById('dockLabel'),
  choiceList: document.getElementById('choiceList'),
  toolView: document.getElementById('toolView'),
  endingView: document.getElementById('endingView'),
  endingTitle: document.getElementById('endingTitle'),
  endingCopy: document.getElementById('endingCopy'),
  endingTags: document.getElementById('endingTags'),
  finalMessageText: document.getElementById('finalMessageText'),
  timerPill: document.getElementById('timerPill'),
  timerText: document.getElementById('timerText'),
  railTimer: document.getElementById('railTimer'),
  supportMeter: document.getElementById('supportMeter'),
  privacyMeter: document.getElementById('privacyMeter'),
  restartDialog: document.getElementById('restartDialog'),
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatTime() {
  return `${String(Math.max(0, state.hours)).padStart(2, '0')}:00:00`;
}

function updateStatus() {
  const time = formatTime();
  els.timerText.textContent = state.chapter >= 3 ? '已接受评估' : time;
  els.railTimer.textContent = time;
  els.supportMeter.style.width = `${clamp(state.support, 0, 100)}%`;
  els.privacyMeter.style.width = `${clamp(state.privacy, 0, 100)}%`;
  els.progressBar.style.width = `${((state.chapter + 1) / chapters.length) * 100}%`;
  [...els.chapterList.children].forEach((item, index) => {
    item.classList.toggle('active', index === state.chapter);
    item.classList.toggle('done', index < state.chapter);
  });
}

function setChapter(index) {
  state.chapter = index;
  els.chapterNumber.textContent = chapters[index].number;
  els.chapterTitle.textContent = chapters[index].title;
  els.chatLog.innerHTML = '';
  els.toolView.hidden = true;
  els.interactionDock.hidden = false;
  els.endingView.hidden = true;
  els.timerPill.classList.toggle('stopped', index >= 3);
  if (index >= 3) els.timerText.textContent = '已接受评估';
  updateStatus();
}

function timeDivider(text) {
  const div = document.createElement('div');
  div.className = 'time-divider';
  div.textContent = text;
  els.chatLog.appendChild(div);
}

function addMessage(sender, text, options = {}) {
  const message = document.createElement('article');
  const type = options.self ? 'self' : options.type || 'q';
  message.className = `message ${type}${options.note ? ' note' : ''}`;
  const initial = sender === 'Q' ? '?' : sender === '互助提示' ? 'i' : sender.slice(0, 1);
  message.innerHTML = options.self
    ? `<div class="bubble-wrap"><span class="sender">${sender}</span><div class="bubble">${text}</div><span class="message-time">刚刚</span></div><div class="message-avatar">${initial}</div>`
    : `<div class="message-avatar">${initial}</div><div class="bubble-wrap"><span class="sender">${sender}</span><div class="bubble">${text}</div><span class="message-time">刚刚</span></div>`;
  els.chatLog.appendChild(message);
  els.chatLog.scrollTop = els.chatLog.scrollHeight;
}

function clearChoices(label) {
  els.dockLabel.textContent = label;
  els.choiceList.innerHTML = '';
  els.interactionDock.hidden = false;
  els.toolView.hidden = true;
}

function choice(label, description, handler) {
  const button = document.createElement('button');
  button.className = 'choice-button';
  button.type = 'button';
  button.innerHTML = `${label}${description ? `<small>${description}</small>` : ''}`;
  button.addEventListener('click', () => {
    els.choiceList.querySelectorAll('button').forEach((item) => { item.disabled = true; });
    handler();
  });
  els.choiceList.appendChild(button);
}

function continueButton(label, handler) {
  clearChoices('继续');
  choice(label, '', handler);
}

function spendTime(hours) {
  state.hours = Math.max(0, state.hours - hours);
  state.delay += hours;
  updateStatus();
}

function beginGame() {
  setChapter(0);
  timeDivider('凌晨 02:13 · 新的匿名会话');
  addMessage('Q', '你好。我可能发生了高风险暴露。现在已经过去两个小时。');
  addMessage('Q', '我不知道该找谁。请不要问我是谁。');
  addMessage('林澈', '这是匿名账号今晚的最后一条消息。我们先回什么？', { self: true });
  clearChoices('选择小安的第一句回复');
  choice('事情发生多久了？防护有没有出现意外？', '先收集与专业评估有关的信息', () => {
    state.support += 12;
    addMessage('小安', '先不用告诉我们你是谁。事情发生多久了？防护有没有出现意外？', { self: true });
    addMessage('Q', '大概两个小时前。使用了安全套，但中途发现破损。对方的HIV感染状态不清楚。');
    continueButton('继续确认有效信息', showInformationChoice);
  });
  choice('对方是谁？你们是什么关系？', '先追问身份和私生活', () => {
    state.support -= 18;
    state.privacy -= 15;
    state.judgment += 1;
    addMessage('小安', '对方是谁？你们是什么关系？', { self: true });
    addMessage('Q', '这和我现在该怎么办有关系吗？我不太想说。');
    addMessage('林澈', '身份不是我们判断风险的依据。先问时间、接触方式和防护情况。', { self: true });
    continueButton('换一种问法', showInformationChoice);
  });
  choice('你确定对方有HIV吗？', '让求助者先证明风险存在', () => {
    state.support -= 10;
    state.judgment += 1;
    addMessage('小安', '你确定对方有HIV吗？', { self: true });
    addMessage('Q', '不知道。就是因为不知道，我才很害怕。');
    addMessage('林澈', '感染状态不明不能靠猜。我们先弄清暴露时间和方式。', { self: true });
    continueButton('回到有效信息', showInformationChoice);
  });
}

function showInformationChoice() {
  clearChoices('接下来需要确认什么');
  choice('暴露时间、接触方式和防护情况', '这些信息有助于专业人员评估', () => {
    state.support += 8;
    addMessage('小安', '我们先记下三件事：发生时间、接触方式、防护有没有破损。', { self: true });
    addMessage('互助提示', '<strong>关系身份不能代替风险评估。</strong> 学生志愿者也不能仅凭聊天判断是否需要PEP。', { type: 'system', note: true });
    continueButton('进入第二章', beginChapterTwo);
  });
  choice('年龄、专业和所在宿舍', '这些并不是当前评估风险的必要信息', () => {
    state.privacy -= 10;
    addMessage('小安', '你可以告诉我年龄、专业和住在哪里吗？', { self: true });
    addMessage('Q', '我不想留下能认出我的信息。');
    addMessage('林澈', '他说得对。我们只问当下必要的信息。', { self: true });
    continueButton('只保留必要信息', beginChapterTwo);
  });
}

function beginChapterTwo() {
  setChapter(1);
  timeDivider(`距离暴露后72小时还有 ${formatTime()}`);
  addMessage('Q', '我现在没有任何感觉。是不是说明没事？');
  addMessage('Q', '网上有人说可以等几天看有没有发热。');
  clearChoices('你准备如何回应');
  choice('不要等症状，尽快联系专业机构评估', 'PEP越早评估越好，最迟不超过暴露后72小时', () => {
    state.support += 12;
    addMessage('小安', '不能靠症状判断。现在先联系能提供专业评估的机构，不要等。', { self: true });
    addMessage('互助提示', '<strong>72小时不是等待时间。</strong> 潜在高风险暴露不等于已经感染，是否需要PEP由专业人员评估。', { type: 'system', note: true });
    continueButton('整理行动顺序', showActionSequence);
  });
  choice('先搜“感染早期症状”，看完再决定', '搜索无法代替专业评估', () => {
    spendTime(7);
    state.support -= 8;
    addMessage('小安', '我先帮你查查会不会发热、出疹子。', { self: true });
    timeDivider(`7小时后 · 剩余 ${formatTime()}`);
    addMessage('Q', '结果越看越害怕，可我还是不知道该怎么办。');
    continueButton('停止搜索，转向行动', showActionSequence);
  });
  choice('先睡一觉，明天观察身体变化', '等待会缩短行动窗口', () => {
    spendTime(10);
    state.support -= 10;
    addMessage('小安', '你先休息，明天看看有没有不舒服。', { self: true });
    timeDivider(`10小时后 · 剩余 ${formatTime()}`);
    addMessage('Q', '我根本睡不着。我们是不是已经浪费了很多时间？');
    continueButton('现在开始行动', showActionSequence);
  });
}

const actionSteps = [
  { card: '停止反复搜索症状', result: '潜在暴露不等于已经感染，也不能靠短期症状判断。' },
  { card: '记录暴露时间与情况', result: '准确记录时间、接触方式和防护情况，便于专业人员评估。' },
  { card: '尽快联系专业机构', result: '由专业人员判断是否符合PEP使用条件，而不是自行开药。' },
];

function showActionSequence() {
  els.interactionDock.hidden = true;
  els.toolView.hidden = false;
  let step = 0;

  function renderStep() {
    const item = actionSteps[step];
    els.toolView.innerHTML = `
      <div class="tool-head"><div><p>72小时行动链</p><h3>把下一步拖进行动区</h3></div><span class="tool-count">${step + 1} / ${actionSteps.length}</span></div>
      <p class="tool-copy">在手机上也可以直接点击行动卡完成这一步。</p>
      <div class="action-board">
        <div class="drop-zone" id="dropZone"><strong>行动区</strong><span>拖到这里</span></div>
        <div class="drag-card" id="dragCard" role="button" tabindex="0">${item.card}</div>
      </div>
      <div class="tap-fallback"><button type="button" id="tapComplete">执行这一步 →</button></div>
      <div class="feedback" id="stepFeedback" hidden></div>`;
    wireDrag(() => {
      document.getElementById('stepFeedback').hidden = false;
      document.getElementById('stepFeedback').textContent = item.result;
      document.getElementById('dragCard').style.opacity = '.25';
      const control = document.getElementById('tapComplete');
      control.textContent = step === actionSteps.length - 1 ? '进入下一章 →' : '下一步 →';
      control.onclick = () => {
        if (step === actionSteps.length - 1) beginChapterThree();
        else { step += 1; renderStep(); }
      };
    });
  }
  renderStep();
}

function wireDrag(onComplete) {
  const card = document.getElementById('dragCard');
  const zone = document.getElementById('dropZone');
  const tap = document.getElementById('tapComplete');
  let drag = null;
  let completed = false;

  function complete() {
    if (completed) return;
    completed = true;
    zone.classList.add('over');
    onComplete();
  }

  card.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    drag = { x: event.clientX, y: event.clientY, left: card.offsetLeft, top: card.offsetTop };
    card.setPointerCapture(event.pointerId);
    card.classList.add('selected');
  });
  card.addEventListener('pointermove', (event) => {
    if (!drag) return;
    card.style.left = `${drag.left + event.clientX - drag.x}px`;
    card.style.top = `${drag.top + event.clientY - drag.y}px`;
    const a = card.getBoundingClientRect();
    const b = zone.getBoundingClientRect();
    zone.classList.toggle('over', a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top);
  });
  card.addEventListener('pointerup', () => {
    if (!drag) return;
    const a = card.getBoundingClientRect();
    const b = zone.getBoundingClientRect();
    drag = null;
    card.classList.remove('selected');
    if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) complete();
    else { card.style.left = ''; card.style.top = ''; zone.classList.remove('over'); }
  });
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') complete();
  });
  tap.addEventListener('click', complete);
}

function beginChapterThree() {
  setChapter(2);
  timeDivider('行动路线 · 选择服务入口');
  addMessage('Q', '我愿意去评估，但我不知道应该去哪里。网上有人卖“阻断套餐”。');
  addMessage('林澈', '我们只能提供就医导航，不能替专业人员判断，也不能推荐来路不明的药。', { self: true });
  clearChoices('帮助Q选择下一步');
  choice('联系当地疾控、医院或其他正规专业机构', '说明暴露时间、方式和防护情况', () => {
    state.support += 12;
    addMessage('小安', '先联系正规专业机构，如实说明时间和情况，请专业人员评估。', { self: true });
    addMessage('Q', '联系上了。他们让我尽快过去。');
    showAssessmentResult();
  });
  choice('在普通网店购买“快速阻断套餐”', '来源、适用性和用法都无法保证', () => {
    state.medicationMistakes += 1;
    state.support -= 10;
    addMessage('小安', '要不先在网上买一套药？', { self: true });
    addMessage('林澈', '不行。是否需要PEP、使用什么方案都要由专业人员评估。', { self: true });
    continueButton('改为联系专业机构', showAssessmentResult);
  });
  choice('等待网友回复后再决定', '网友经验不能替代专业评估', () => {
    spendTime(5);
    state.support -= 6;
    addMessage('小安', '我们先发帖问问有没有相似经历。', { self: true });
    timeDivider(`又过去5小时 · 剩余 ${formatTime()}`);
    addMessage('Q', '每个人说的都不一样。我还是联系专业机构吧。');
    continueButton('接受专业评估', showAssessmentResult);
  });
}

function showAssessmentResult() {
  els.timerPill.classList.add('stopped');
  els.timerText.textContent = '已接受评估';
  addMessage('互助提示', 'Q已经抵达专业机构。经专业评估，医务人员建议其启动PEP。PEP应越早开始越好，最迟不超过暴露后72小时。', { type: 'system', note: true });
  addMessage('Q', '我已经按照医嘱开始了。接下来是不是拿到药就结束了？');
  continueButton('进入第28天', beginChapterFour);
}

function beginChapterFour() {
  setChapter(3);
  timeDivider('PEP记录 · 第1天');
  addMessage('Q', '医生说通常需要连续服用28天。我怕自己忘记。');
  addMessage('小安', '我们可以帮你做一个不包含身份信息的提醒清单。', { self: true });
  showMedicationCalendar(0);
}

const medicationScenarios = [
  {
    day: '第1天',
    q: '我应该怎么避免忘记？',
    choices: [
      ['设置固定提醒，并按医嘱服用', true],
      ['想起来再吃就可以', false],
      ['一次多吃一点，之后就不怕漏', false],
    ],
    correct: '建立固定提醒有助于按医嘱完成疗程。',
  },
  {
    day: '第9天',
    q: '今天有些不舒服，我能自己换药吗？',
    choices: [
      ['及时联系专业人员，不自行换药或停药', true],
      ['先停几天看看', false],
      ['换成网上推荐的方案', false],
    ],
    correct: '出现不适应及时咨询专业人员，不自行调整方案。',
  },
  {
    day: '第17天',
    q: '我好像漏服了。是不是下一次加倍？',
    choices: [
      ['尽快咨询专业人员，按其建议处理', true],
      ['自行加倍补回来', false],
      ['既然漏了就直接停药', false],
    ],
    correct: '漏服后的处理应咨询专业人员，不自行加量。',
  },
  {
    day: '第28天',
    q: '药吃完了，也没有症状，是不是不用检测了？',
    choices: [
      ['按专业建议完成检测和必要复查', true],
      ['没有症状就不用检测', false],
      ['自己买试纸一次就结束', false],
    ],
    correct: '不能依靠症状判断，应按专业建议完成检测和复查。',
  },
];

function showMedicationCalendar(index) {
  els.interactionDock.hidden = true;
  els.toolView.hidden = false;
  const item = medicationScenarios[index];
  els.toolView.innerHTML = `
    <div class="tool-head"><div><p>28天行动日历</p><h3>${item.day}</h3></div><span class="tool-count">${index + 1} / 4</span></div>
    <div class="day-strip"><span class="${index === 0 ? 'active' : ''}">第1天</span><span class="${index === 1 ? 'active' : ''}">第9天</span><span class="${index === 2 ? 'active' : ''}">第17天</span><span class="${index === 3 ? 'active' : ''}">第28天</span></div>
    <p class="tool-copy">Q：${item.q}</p>
    <div class="scenario-grid" id="medChoices"></div>`;
  const container = document.getElementById('medChoices');
  item.choices.forEach(([label, isCorrect]) => {
    const button = document.createElement('button');
    button.className = 'scenario-card';
    button.type = 'button';
    button.innerHTML = `<b>${label}</b><small>选择这条回复</small>`;
    button.addEventListener('click', () => {
      if (!isCorrect) state.medicationMistakes += 1;
      const feedback = document.createElement('div');
      feedback.className = 'feedback';
      feedback.textContent = isCorrect ? item.correct : `这不是稳妥的处理方式。${item.correct}`;
      els.toolView.appendChild(feedback);
      const next = document.createElement('div');
      next.className = 'tap-fallback';
      const nextButton = document.createElement('button');
      nextButton.textContent = index === medicationScenarios.length - 1 ? '进入下一章 →' : '继续记录 →';
      nextButton.addEventListener('click', () => {
        if (index === medicationScenarios.length - 1) beginChapterFive();
        else showMedicationCalendar(index + 1);
      });
      next.appendChild(nextButton);
      els.toolView.appendChild(next);
      container.querySelectorAll('button').forEach((itemButton) => { itemButton.disabled = true; });
    });
    container.appendChild(button);
  });
}

function beginChapterFive() {
  setChapter(4);
  timeDivider('疗程之后 · 新的问题');
  addMessage('Q', '如果以后仍可能遇到类似风险，是不是每次都只能等到事后？');
  addMessage('小安', '不是。除了正确、全程使用安全套，还可以向专业机构了解PrEP。', { self: true });
  addMessage('林澈', '我们把几个概念分清楚，但不替任何人制定用药方案。', { self: true });
  continueButton('开始辨析', showPreventionMatch);
}

const preventionRows = [
  { label: '可能暴露后，尽快接受紧急预防评估', correct: 'PEP' },
  { label: '尚未感染且可能持续存在暴露风险时咨询', correct: 'PrEP' },
  { label: '了解当前感染状态，不能由症状替代', correct: '检测' },
  { label: '正确、全程使用的屏障防护', correct: '安全套' },
];

function showPreventionMatch() {
  els.interactionDock.hidden = true;
  els.toolView.hidden = false;
  els.toolView.innerHTML = `
    <div class="tool-head"><div><p>暴露前与暴露后</p><h3>把概念放回正确位置</h3></div><span class="tool-count">0 / 4</span></div>
    <p class="tool-copy">点击每一行最合适的答案。PEP与PrEP都应在专业指导下使用。</p>
    <div class="match-list" id="matchList"></div>
    <div class="tap-fallback"><button type="button" id="finishMatch" disabled>完成辨析 →</button></div>`;
  const list = document.getElementById('matchList');
  const answers = ['PEP', 'PrEP', '检测', '安全套'];
  let answered = 0;
  preventionRows.forEach((row, rowIndex) => {
    const line = document.createElement('div');
    line.className = 'match-row';
    line.innerHTML = `<span>${row.label}</span>`;
    answers.forEach((answer) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = answer;
      button.addEventListener('click', () => {
        if (state.prepAnswers[rowIndex]) return;
        state.prepAnswers[rowIndex] = answer;
        button.classList.add('selected');
        answered += 1;
        if (answer === row.correct) state.correctMatches += 1;
        [...line.querySelectorAll('button')].forEach((item) => { item.disabled = true; });
        document.querySelector('.tool-count').textContent = `${answered} / 4`;
        if (answered === preventionRows.length) document.getElementById('finishMatch').disabled = false;
      });
      line.appendChild(button);
    });
    list.appendChild(line);
  });
  document.getElementById('finishMatch').addEventListener('click', () => {
    document.getElementById('finishMatch').disabled = true;
    const copy = state.correctMatches === 4
      ? '你分清了：PEP用于暴露后紧急预防，PrEP用于暴露前预防，检测用于了解感染状态，安全套需要正确、全程使用。'
      : 'PEP用于暴露后紧急预防；PrEP用于暴露前预防；检测不能由症状替代；安全套需要正确、全程使用。';
    els.toolView.innerHTML += `<div class="feedback">${copy}</div>`;
    const next = document.createElement('div');
    next.className = 'tap-fallback';
    next.innerHTML = '<button type="button" id="toPrivacy">进入最后一章 →</button>';
    els.toolView.appendChild(next);
    document.getElementById('toPrivacy').addEventListener('click', beginChapterSix);
  });
}

function beginChapterSix() {
  setChapter(5);
  timeDivider('一个月后 · 公开科普准备中');
  addMessage('林澈', 'Q的经历很有代表性。我们准备做一期72小时行动指南。');
  addMessage('林澈', '要不要截几段聊天，把名字和头像遮住？');
  clearChoices('发布之前，你会怎么做');
  choice('不用聊天记录，根据权威资料重新制作指南', '不公开个案，也能让更多人获得帮助', () => {
    state.privacy += 22;
    state.support += 8;
    addMessage('小安', '那不是我们的故事。我们不用聊天记录，只根据审核过的资料制作指南。', { self: true });
    addMessage('林澈', '同意。时间、措辞和细节都可能让熟人认出当事人。', { self: true });
    showPublicComments(true);
  });
  choice('先征求Q的明确同意，再决定是否引用', '是否公开应由当事人自主决定', () => {
    state.privacy += 8;
    addMessage('小安', '如果确实需要引用，至少要先征求Q的明确同意。', { self: true });
    addMessage('Q', '谢谢你们先问我。我不希望公开聊天，但可以做不包含个案的科普。');
    showPublicComments(true);
  });
  choice('遮住头像和名字，直接发布聊天截图', '事件细节和语言习惯也可能暴露身份', () => {
    state.privacy -= 28;
    state.judgment += 1;
    addMessage('小安', '遮住头像和名字应该就认不出来了。', { self: true });
    addMessage('林澈', '不够。时间、经历和说话方式仍可能让熟人识别。不能替Q公开。', { self: true });
    addMessage('小安', '那就不用聊天记录，重新做一份指南。', { self: true });
    showPublicComments(false);
  });
}

function showPublicComments(protectedPrivacy) {
  addMessage('互助提示', '科普指南发布后，评论区出现疑问：“吃PEP是不是说明已经感染？”“是不是生活很乱的人才需要PEP？”', { type: 'system', note: true });
  clearChoices('选择公开回复');
  choice('PEP是暴露后的预防措施，不代表已经感染', '风险判断针对具体暴露行为，不是道德评价', () => {
    state.support += 10;
    addMessage('小安', 'PEP是暴露后的紧急预防措施，不代表已经感染。需要帮助的人不应先被道德评价。', { self: true });
    finishGame(protectedPrivacy);
  });
  choice('只有生活混乱的人才会需要PEP', '这会加深污名，也可能阻碍他人求助', () => {
    state.support -= 22;
    state.judgment += 2;
    addMessage('小安', '这类情况通常是个人生活选择造成的。', { self: true });
    addMessage('林澈', '这种说法不准确，也会让真正需要帮助的人不敢求助。我们应该纠正它。', { self: true });
    finishGame(protectedPrivacy);
  });
  choice('删除所有评论，不再解释', '问题不会因为删除而消失', () => {
    state.support -= 5;
    addMessage('小安', '先把评论全部关掉吧。', { self: true });
    addMessage('林澈', '可以管理攻击性内容，但公开误解仍需要准确回应。');
    finishGame(protectedPrivacy);
  });
}

function finishGame(protectedPrivacy) {
  els.chatLog.hidden = true;
  els.interactionDock.hidden = true;
  els.toolView.hidden = true;
  els.endingView.hidden = false;
  let ending;
  if (state.judgment >= 3 || state.support < 35) {
    ending = {
      title: '对方已离线',
      copy: '你最终提供了部分信息，但追问、判断或带有污名的回应让求助变得更困难。真正有效的帮助，需要先让对方愿意继续说下去。',
      tags: ['减少道德判断', '先回应行动问题', '保护求助空间'],
      message: '“我想要的是下一步该怎么办，不是先证明自己值得被帮助。”',
    };
  } else if (state.delay >= 10) {
    ending = {
      title: '搜索结果没有尽头',
      copy: '你们最后找到了专业入口，但搜索症状和等待消耗了重要时间。72小时不是用来观察症状的期限，而是尽快接受专业评估的行动窗口。',
      tags: ['停止搜索症状', '越早评估越好', '高风险不等于感染'],
      message: '“以后再遇到这种事，我会先行动，不再等搜索结果给我答案。”',
    };
  } else if (state.medicationMistakes >= 2) {
    ending = {
      title: '拿到药以后',
      copy: '你们及时启动了行动，却低估了规范用药和后续检测的重要性。开始PEP不是终点，具体用药、漏服处理和复查都应遵循专业建议。',
      tags: ['完成28天疗程', '不自行调整用药', '按建议检测复查'],
      message: '“我以为拿到药就结束了。现在我知道，后面的每一天也很重要。”',
    };
  } else if (!protectedPrivacy || state.privacy < 55) {
    ending = {
      title: '名字遮住了，故事没有',
      copy: '你们完成了行动指南，却差一点让个案细节暴露求助者。隐去姓名并不一定等于匿名，健康求助需要更严格的隐私边界。',
      tags: ['不替他人公开', '最少必要信息', '隐私也是支持'],
      message: '“谢谢你们最后没有发出聊天记录。那段经历仍然应该由我决定是否公开。”',
    };
  } else {
    ending = {
      title: '把灯留着',
      copy: '你们帮助Q在行动窗口内找到专业评估，陪伴其理解并完成PEP流程，也把个案留在了匿名会话里。后来发布的指南没有任何人的故事，却能帮助下一个需要行动的人。',
      tags: ['及时行动', '规范完成PEP', '了解PrEP', '保护隐私'],
      message: '“谢谢你们没有先问我是谁，而是先告诉我该怎么做。”',
    };
  }
  els.endingTitle.textContent = ending.title;
  els.endingCopy.textContent = ending.copy;
  els.endingTags.innerHTML = ending.tags.map((tag) => `<span>${tag}</span>`).join('');
  els.finalMessageText.textContent = `“${ending.message.replace(/^“|”$/g, '')}”`;
}

function resetGame() {
  state.chapter = 0;
  state.hours = 70;
  state.support = 50;
  state.privacy = 70;
  state.delay = 0;
  state.judgment = 0;
  state.medicationMistakes = 0;
  state.correctMatches = 0;
  state.prepAnswers = {};
  els.chatLog.hidden = false;
  els.timerPill.classList.remove('stopped');
  els.restartDialog.close();
  beginGame();
}

document.getElementById('restartButton').addEventListener('click', () => els.restartDialog.showModal());
document.getElementById('cancelRestart').addEventListener('click', () => els.restartDialog.close());
document.getElementById('confirmRestart').addEventListener('click', resetGame);
document.getElementById('playAgainButton').addEventListener('click', resetGame);

resetGame();
