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
  informationFound: new Set(),
  dismissedRumors: new Set(),
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
  timeDivider('凌晨 02:13 · 今晚最后一条匿名消息');
  addMessage('Q', '你好。刚才安全套好像破了，我不知道这算不算暴露。');
  addMessage('Q', '我很害怕，也不知道该找谁。请不要问我是谁。');
  clearChoices('选择小安的第一句回复');
  choice('先别急，我们只整理评估需要的信息', '不追问身份，也不替专业人员下结论', () => {
    state.support += 12;
    addMessage('小安', '不用告诉我们你是谁。我们先把专业评估需要的信息整理出来。', { self: true });
    addMessage('Q', '好。事情发生在两个小时前，对方的HIV感染状态我不清楚。');
    continueButton('整理就诊信息', showInformationPuzzle);
  });
  choice('对方是谁？你们是什么关系？', '先追问身份和私生活', () => {
    state.support -= 18;
    state.privacy -= 15;
    state.judgment += 1;
    addMessage('小安', '对方是谁？你们是什么关系？', { self: true });
    addMessage('Q', '这和我现在该怎么办有关系吗？我不太想说。');
    addMessage('林澈', '身份不是我们判断风险的依据。先问时间、接触方式和防护情况。', { self: true });
    continueButton('换一种问法', showInformationPuzzle);
  });
  choice('你确定对方有HIV吗？', '让求助者先证明风险存在', () => {
    state.support -= 10;
    state.judgment += 1;
    addMessage('小安', '你确定对方有HIV吗？', { self: true });
    addMessage('Q', '不知道。就是因为不知道，我才很害怕。');
    addMessage('林澈', '感染状态不明不能靠猜。我们先弄清暴露时间和方式。', { self: true });
    continueButton('回到有效信息', showInformationPuzzle);
  });
}

const informationCards = [
  { id: 'time', label: '发生时间', value: '约2小时前', needed: true, why: 'PEP有明确的时间窗口，专业人员需要知道距离暴露过去了多久。' },
  { id: 'contact', label: '接触方式', value: '发生了可能接触体液的性接触', needed: true, why: '不同接触方式的传播风险不同，需要据此进行专业评估。' },
  { id: 'protection', label: '防护情况', value: '使用了安全套，中途发现破损', needed: true, why: '是否正确、全程使用防护，以及是否出现破损，都会影响评估。' },
  { id: 'status', label: '对方感染状态', value: '目前不清楚', needed: true, why: '“不清楚”不等于已经感染，也不能据此排除风险，应如实告诉专业人员。' },
  { id: 'name', label: '真实姓名和学号', needed: false, why: '学生志愿者没有必要收集能识别Q身份的信息。' },
  { id: 'relationship', label: '两个人是什么关系', needed: false, why: '恋爱、婚姻或陌生关系不能代替对具体接触行为的风险评估。' },
  { id: 'history', label: '完整的私人生活经历', needed: false, why: '只收集当前专业评估所需的信息，避免无关追问和道德判断。' },
];

function showInformationPuzzle() {
  els.interactionDock.hidden = true;
  els.toolView.hidden = false;
  state.informationFound = new Set();
  els.toolView.innerHTML = `
    <div class="tool-head"><div><p>就诊信息拼图</p><h3>帮Q整理四项必要信息</h3></div><span class="tool-count" id="infoCount">0 / 4</span></div>
    <p class="tool-copy">点击需要带去专业评估的信息。选到无关隐私时，会告诉你为什么不必追问。</p>
    <div class="info-slots" id="infoSlots">
      <span>发生时间</span><span>接触方式</span><span>防护情况</span><span>对方状态</span>
    </div>
    <div class="info-card-grid" id="infoCards"></div>
    <div class="feedback" id="infoFeedback">先从最能帮助专业人员判断下一步的信息开始。</div>
    <div class="tap-fallback"><button type="button" id="finishInfo" disabled>带着信息开始行动 →</button></div>`;

  const slots = [...document.querySelectorAll('#infoSlots span')];
  const grid = document.getElementById('infoCards');
  const feedback = document.getElementById('infoFeedback');
  informationCards.forEach((item) => {
    const button = document.createElement('button');
    button.className = 'info-card';
    button.type = 'button';
    button.innerHTML = `<b>${item.label}</b>${item.value ? `<small>${item.value}</small>` : '<small>是否需要追问？</small>'}`;
    button.addEventListener('click', () => {
      if (item.needed) {
        if (state.informationFound.has(item.id)) return;
        const slotIndex = informationCards.filter((card) => card.needed).findIndex((card) => card.id === item.id);
        state.informationFound.add(item.id);
        button.classList.add('selected');
        button.disabled = true;
        slots[slotIndex].classList.add('filled');
        slots[slotIndex].innerHTML = `<b>${item.label}</b><small>${item.value}</small>`;
        feedback.className = 'feedback positive';
        feedback.innerHTML = `<strong>为什么要问：</strong>${item.why}`;
        document.getElementById('infoCount').textContent = `${state.informationFound.size} / 4`;
        if (state.informationFound.size === 4) document.getElementById('finishInfo').disabled = false;
      } else {
        state.privacy -= 3;
        updateStatus();
        button.classList.add('unneeded');
        feedback.className = 'feedback negative';
        feedback.innerHTML = `<strong>不必收集：</strong>${item.why}`;
      }
    });
    grid.appendChild(button);
  });

  document.getElementById('finishInfo').addEventListener('click', () => {
    state.support += 8;
    addMessage('互助提示', '<strong>信息已经够用了。</strong> 是否需要PEP仍应由专业人员结合具体情况评估，学生志愿者不能仅凭聊天下结论。', { type: 'system', note: true });
    continueButton('进入第二章', beginChapterTwo);
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
    continueButton('先清理搜索误区', showSearchRumors);
  });
  choice('先搜“感染早期症状”，看完再决定', '搜索无法代替专业评估', () => {
    spendTime(7);
    state.support -= 8;
    addMessage('小安', '我先帮你查查会不会发热、出疹子。', { self: true });
    timeDivider(`7小时后 · 剩余 ${formatTime()}`);
    addMessage('Q', '结果越看越害怕，可我还是不知道该怎么办。');
    continueButton('停止搜索，辨别这些说法', showSearchRumors);
  });
  choice('先睡一觉，明天观察身体变化', '等待会缩短行动窗口', () => {
    spendTime(10);
    state.support -= 10;
    addMessage('小安', '你先休息，明天看看有没有不舒服。', { self: true });
    timeDivider(`10小时后 · 剩余 ${formatTime()}`);
    addMessage('Q', '我根本睡不着。我们是不是已经浪费了很多时间？');
    continueButton('现在开始行动', showSearchRumors);
  });
}

const searchRumors = [
  { title: '“出现发热，才说明可能感染”', fact: 'HIV感染不能根据某一种症状判断；其他疾病也可能出现相似症状。' },
  { title: '“现在没有症状，应该就没事”', fact: '没有症状不能排除感染，感染状态需要通过检测了解。' },
  { title: '“72小时内先观察身体变化”', fact: '72小时是尽快接受PEP专业评估的最迟窗口，不是等待症状的时间。' },
];

function showSearchRumors() {
  els.interactionDock.hidden = true;
  els.toolView.hidden = false;
  state.dismissedRumors = new Set();
  els.toolView.innerHTML = `
    <div class="tool-head"><div><p>搜索结果整理</p><h3>把误导行动的说法划掉</h3></div><span class="tool-count" id="rumorCount">0 / 3</span></div>
    <p class="tool-copy">Q把三条搜索结果发了过来。逐条点击，看看它们为什么不能指导行动。</p>
    <div class="rumor-list" id="rumorList"></div>
    <div class="feedback" id="rumorFeedback">症状既不能确认感染，也不能排除感染。</div>
    <div class="tap-fallback"><button type="button" id="finishRumors" disabled>整理72小时行动顺序 →</button></div>`;
  const list = document.getElementById('rumorList');
  searchRumors.forEach((item, index) => {
    const button = document.createElement('button');
    button.className = 'rumor-card';
    button.type = 'button';
    button.innerHTML = `<span>搜索结果 ${index + 1}</span><b>${item.title}</b><small>点击核对</small>`;
    button.addEventListener('click', () => {
      if (state.dismissedRumors.has(index)) return;
      state.dismissedRumors.add(index);
      button.classList.add('dismissed');
      button.innerHTML = `<span>不能据此判断</span><b>${item.title}</b><small>${item.fact}</small>`;
      document.getElementById('rumorFeedback').innerHTML = `<strong>核对结果：</strong>${item.fact}`;
      document.getElementById('rumorCount').textContent = `${state.dismissedRumors.size} / 3`;
      if (state.dismissedRumors.size === searchRumors.length) document.getElementById('finishRumors').disabled = false;
    });
    list.appendChild(button);
  });
  document.getElementById('finishRumors').addEventListener('click', showActionSequence);
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
    spendTime(2);
    addMessage('小安', '要不先在网上买一套药？', { self: true });
    addMessage('Q', '我差点已经下单了。两个小时又过去了，可我还是没有得到专业评估。');
    addMessage('互助提示', '<strong>后果：</strong>来路不明的药物信息延误了行动。是否需要PEP、使用什么方案都应由专业人员评估。', { type: 'system', note: true });
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
  addMessage('Q', '我已经到专业机构了，但有点紧张。接下来会发生什么？');
  continueButton('陪Q了解评估过程', showAssessmentJourney);
}

const assessmentSteps = [
  { title: '说明暴露情况', copy: '向专业人员说明发生时间、接触方式、防护情况和已知的对方感染状态。无需先证明自己“属于哪类人”。' },
  { title: '接受必要评估', copy: '专业人员会结合具体情况进行风险评估，并安排必要的基础检测或健康状况评估；具体项目因个人情况而异。' },
  { title: '作出专业判断', copy: '不是每一次担忧都需要PEP。是否建议启动、采用什么方案，应由专业人员判断。' },
  { title: '确认后续安排', copy: '如果启动PEP，要听清服药方法、可能的不适、咨询方式，以及后续检测和复查安排。' },
];

function showAssessmentJourney() {
  els.interactionDock.hidden = true;
  els.toolView.hidden = false;
  let revealed = 0;
  els.toolView.innerHTML = `
    <div class="tool-head"><div><p>到达专业机构</p><h3>一次评估通常会经历什么</h3></div><span class="tool-count" id="assessmentCount">0 / 4</span></div>
    <p class="tool-copy">按顺序打开四个步骤。实际流程和检查项目以专业机构安排为准。</p>
    <div class="assessment-path" id="assessmentPath"></div>
    <div class="tap-fallback"><button type="button" id="finishAssessment" disabled>查看评估结果 →</button></div>`;
  const path = document.getElementById('assessmentPath');
  assessmentSteps.forEach((item, index) => {
    const button = document.createElement('button');
    button.className = 'assessment-step';
    button.type = 'button';
    button.disabled = index !== 0;
    button.innerHTML = `<i>${index + 1}</i><span><b>${item.title}</b><small>${index === 0 ? '点击了解' : '完成上一步后解锁'}</small></span>`;
    button.addEventListener('click', () => {
      if (button.classList.contains('revealed')) return;
      button.classList.add('revealed');
      button.innerHTML = `<i>✓</i><span><b>${item.title}</b><small>${item.copy}</small></span>`;
      revealed += 1;
      document.getElementById('assessmentCount').textContent = `${revealed} / 4`;
      const next = path.children[index + 1];
      if (next) {
        next.disabled = false;
        next.querySelector('small').textContent = '点击了解';
      }
      if (revealed === assessmentSteps.length) document.getElementById('finishAssessment').disabled = false;
    });
    path.appendChild(button);
  });
  document.getElementById('finishAssessment').addEventListener('click', () => {
    els.toolView.hidden = true;
    addMessage('互助提示', '经专业评估，医务人员建议Q启动PEP。PEP是潜在暴露后的预防措施，不代表已经感染；应越早开始越好，最迟不超过暴露后72小时。', { type: 'system', note: true });
    addMessage('Q', '我已经按照医嘱开始了。接下来是不是拿到药就结束了？');
    continueButton('进入第28天', beginChapterFour);
  });
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
      { label: '设置固定提醒，并按医嘱服用', correct: true },
      { label: '想起来再吃就可以', consequence: 'Q没有建立固定提醒，第二天差点漏服，服药计划变得不稳定。' },
      { label: '一次多吃一点，之后就不怕漏', consequence: 'Q准备自行加量。错误加量可能带来用药风险，需要停止并咨询专业人员。' },
    ],
    correct: '建立固定提醒有助于按医嘱完成疗程。',
  },
  {
    day: '第9天',
    q: '今天有些不舒服，我能自己换药吗？',
    choices: [
      { label: '及时联系专业人员，不自行换药或停药', correct: true },
      { label: '先停几天看看', consequence: 'Q自行暂停了一次用药，疗程连续性受到影响，需要尽快向专业人员说明。' },
      { label: '换成网上推荐的方案', consequence: 'Q差点用来源不明的方案替换医嘱，用药安全和疗程连续性受到影响。' },
    ],
    correct: '出现不适应及时咨询专业人员，不自行调整方案。',
  },
  {
    day: '第17天',
    q: '我好像漏服了。是不是下一次加倍？',
    choices: [
      { label: '尽快咨询专业人员，按其建议处理', correct: true },
      { label: '自行加倍补回来', consequence: 'Q准备自行加倍。漏服不能靠擅自加量处理，需要尽快咨询专业人员。' },
      { label: '既然漏了就直接停药', consequence: 'Q想放弃余下疗程，规范完成PEP的计划被中断。' },
    ],
    correct: '漏服后的处理应咨询专业人员，不自行加量。',
  },
  {
    day: '第28天',
    q: '药吃完了，也没有症状，是不是不用检测了？',
    choices: [
      { label: '按专业建议完成检测和必要复查', correct: true },
      { label: '没有症状就不用检测', consequence: 'Q把“没有症状”当成结果，感染状态仍无法确认，后续检测计划被中断。' },
      { label: '自己买试纸一次就结束', consequence: 'Q把一次自行检测当成全部随访，可能遗漏专业建议的检测节点。' },
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
  item.choices.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'scenario-card';
    button.type = 'button';
    button.innerHTML = `<b>${option.label}</b><small>选择这条回复</small>`;
    button.addEventListener('click', () => {
      if (!option.correct) {
        state.medicationMistakes += 1;
        state.support -= 7;
      } else {
        state.support += 3;
      }
      updateStatus();
      const feedback = document.createElement('div');
      feedback.className = `feedback ${option.correct ? 'positive' : 'negative'}`;
      feedback.innerHTML = option.correct
        ? `<strong>行动结果：</strong>${item.correct}`
        : `<strong>选择后果：</strong>${option.consequence}<br>${item.correct}`;
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
  addMessage('小安', '不一定。我们把“暴露前、暴露后、确认状态”分别做成行动方案。', { self: true });
  addMessage('互助提示', '这里不是测验。每个阶段都会先出现生活情境，再把可用工具加入Q的计划。', { type: 'system', note: true });
  continueButton('和Q一起制定方案', () => showPreventionScene(0));
}

const preventionScenes = [
  {
    phase: '暴露前',
    question: '如果下一次能提前准备，我可以做什么？',
    intro: '预防不必等意外发生后才开始。把两项暴露前工具加入计划。',
    tools: [
      { title: '正确、全程使用安全套', copy: '安全套是降低HIV及其他性传播感染风险的重要方式，需要从接触开始到结束正确、全程使用。' },
      { title: '向专业机构咨询PrEP', copy: 'PrEP是暴露前预防，适用于尚未感染HIV、但可能持续存在暴露风险的人，需要先接受专业咨询和评估。' },
    ],
  },
  {
    phase: '潜在暴露后',
    question: '如果又发生安全套破损，我应该先做什么？',
    intro: 'PEP不是日常预防药，也不是感染后的治疗方案，而是潜在暴露后的紧急预防。',
    tools: [
      { title: '尽快接受PEP专业评估', copy: '记录时间和情况，尽快联系正规专业机构。越早评估越好，最迟不超过暴露后72小时。' },
    ],
  },
  {
    phase: '确认状态',
    question: '身体没有不舒服，能不能说明没有感染？',
    intro: '症状不能回答感染状态。把确认状态的方法加入计划。',
    tools: [
      { title: '按专业建议进行HIV检测', copy: 'HIV检测用于了解感染状态。检测与复查时间应听从专业建议，不能用有无症状代替。' },
    ],
  },
];

function showPreventionScene(sceneIndex) {
  els.interactionDock.hidden = true;
  els.toolView.hidden = false;
  const scene = preventionScenes[sceneIndex];
  let added = 0;
  els.toolView.innerHTML = `
    <div class="tool-head"><div><p>${scene.phase}</p><h3>${scene.question}</h3></div><span class="tool-count">${sceneIndex + 1} / 3</span></div>
    <p class="tool-copy">${scene.intro}</p>
    <div class="plan-stage">
      <div class="plan-options" id="planOptions"></div>
      <div class="plan-sheet"><span>Q的行动计划</span><div id="planItems"><small>点击左侧工具加入计划</small></div></div>
    </div>
    <div class="feedback positive" id="planFeedback" hidden></div>
    <div class="tap-fallback"><button type="button" id="finishScene" disabled>${sceneIndex === preventionScenes.length - 1 ? '完成预防方案 →' : '进入下一个阶段 →'}</button></div>`;
  const options = document.getElementById('planOptions');
  const items = document.getElementById('planItems');
  scene.tools.forEach((tool) => {
    const button = document.createElement('button');
    button.className = 'plan-tool';
    button.type = 'button';
    button.innerHTML = `<b>${tool.title}</b><small>加入行动计划</small>`;
    button.addEventListener('click', () => {
      if (button.disabled) return;
      if (added === 0) items.innerHTML = '';
      added += 1;
      button.disabled = true;
      button.classList.add('added');
      const item = document.createElement('article');
      item.innerHTML = `<b>${tool.title}</b><p>${tool.copy}</p>`;
      items.appendChild(item);
      if (added === scene.tools.length) {
        const feedback = document.getElementById('planFeedback');
        feedback.hidden = false;
        feedback.innerHTML = `<strong>${scene.phase}：</strong>${scene.tools.map((toolItem) => toolItem.title).join('；')}。`;
        document.getElementById('finishScene').disabled = false;
      }
    });
    options.appendChild(button);
  });
  document.getElementById('finishScene').addEventListener('click', () => {
    if (sceneIndex === preventionScenes.length - 1) {
      addMessage('Q', '我明白了：暴露前可以提前预防，潜在暴露后及时评估，感染状态要靠检测确认。');
      continueButton('进入最后一章', beginChapterSix);
    } else {
      showPreventionScene(sceneIndex + 1);
    }
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
    showGuideBuilder(true);
  });
  choice('先征求Q的明确同意，再决定是否引用', '是否公开应由当事人自主决定', () => {
    state.privacy += 8;
    addMessage('小安', '如果确实需要引用，至少要先征求Q的明确同意。', { self: true });
    addMessage('Q', '谢谢你们先问我。我不希望公开聊天，但可以做不包含个案的科普。');
    showGuideBuilder(true);
  });
  choice('遮住头像和名字，直接发布聊天截图', '事件细节和语言习惯也可能暴露身份', () => {
    state.privacy -= 28;
    state.judgment += 1;
    addMessage('小安', '遮住头像和名字应该就认不出来了。', { self: true });
    addMessage('林澈', '不够。时间、经历和说话方式仍可能让熟人识别。不能替Q公开。', { self: true });
    addMessage('小安', '那就不用聊天记录，重新做一份指南。', { self: true });
    showGuideBuilder(false);
  });
}

const guideModules = [
  '记录暴露发生的时间、接触方式和防护情况',
  '不要等待症状，也不要通过症状自行判断',
  '尽快联系当地正规专业机构接受评估',
  'PEP越早评估越好，最迟不超过暴露后72小时',
  '如启动PEP，按医嘱完成用药并咨询异常情况',
  '按专业建议完成HIV检测和必要复查',
];

function showGuideBuilder(protectedPrivacy) {
  els.interactionDock.hidden = true;
  els.toolView.hidden = false;
  let added = 0;
  els.toolView.innerHTML = `
    <div class="tool-head"><div><p>公开科普制作中</p><h3>完成72小时行动指南</h3></div><span class="tool-count" id="guideBuildCount">0 / 6</span></div>
    <p class="tool-copy">不使用Q的聊天记录。把六张经过审核的行动卡依次加入公开指南。</p>
    <div class="guide-builder">
      <div class="module-pool" id="modulePool"></div>
      <div class="guide-preview"><span>72小时行动指南</span><ol id="guidePreview"></ol></div>
    </div>
    <div class="tap-fallback"><button type="button" id="publishGuide" disabled>发布不含个案的指南 →</button></div>`;
  const pool = document.getElementById('modulePool');
  const preview = document.getElementById('guidePreview');
  guideModules.forEach((copy, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'guide-module';
    button.innerHTML = `<i>${index + 1}</i><span>${copy}</span>`;
    button.addEventListener('click', () => {
      button.disabled = true;
      button.classList.add('added');
      const item = document.createElement('li');
      item.textContent = copy;
      preview.appendChild(item);
      added += 1;
      document.getElementById('guideBuildCount').textContent = `${added} / 6`;
      if (added === guideModules.length) document.getElementById('publishGuide').disabled = false;
    });
    pool.appendChild(button);
  });
  document.getElementById('publishGuide').addEventListener('click', () => {
    els.toolView.hidden = true;
    addMessage('互助提示', '指南已经发布：没有任何人的聊天截图，只有可以直接带走的行动步骤。', { type: 'system', note: true });
    showPublicComments(protectedPrivacy);
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
  state.informationFound = new Set();
  state.dismissedRumors = new Set();
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
