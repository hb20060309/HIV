const state = {
  scene: 0,
  trust: 0,
  knowledge: 0,
  anxiety: 0,
  hoursRemaining: 72,
  actionStarted: false,
  interactionStep: 0,
  delayCount: 0,
};

const els = {
  speakerName: document.getElementById('speakerName'),
  dialogueText: document.getElementById('dialogueText'),
  dialogueActions: document.getElementById('dialogueActions'),
  hotspotHint: document.getElementById('hotspotHint'),
  choicePanel: document.getElementById('choicePanel'),
  choiceKicker: document.getElementById('choiceKicker'),
  choiceList: document.getElementById('choiceList'),
  conversationPanel: document.getElementById('conversationPanel'),
  interactionPanel: document.getElementById('interactionPanel'),
  interactionTitle: document.getElementById('interactionTitle'),
  interactionCopy: document.getElementById('interactionCopy'),
  dragZone: document.getElementById('dragZone'),
  draggablePack: document.getElementById('draggablePack'),
  stepCount: document.getElementById('stepCount'),
  stepActions: document.getElementById('stepActions'),
  endingPanel: document.getElementById('endingPanel'),
  endingTitle: document.getElementById('endingTitle'),
  endingText: document.getElementById('endingText'),
  endingStats: document.getElementById('endingStats'),
  sceneCounter: document.getElementById('sceneCounter'),
  sceneSticker: document.getElementById('sceneSticker'),
  stageNote: document.getElementById('stageNote'),
  countdownBadge: document.getElementById('countdownBadge'),
  countdownText: document.getElementById('countdownText'),
  xiao: document.getElementById('xiaoCharacter'),
  lin: document.getElementById('linCharacter'),
};

const scenes = [
  { speaker: '旁白', text: '夜里的一条消息，让原本熟悉的房间突然安静下来。', next: '林澈的手停在手机屏幕上。' },
  { speaker: '林澈', text: '小安，先别急。我们把刚才的情况说清楚，好吗？', next: '他没有急着下结论，只把手机放到两人中间。' },
  { speaker: '小安', text: '我只记得……可能发生了体液接触。我现在有点害怕。', next: '小安握紧了手，呼吸变得很快。', near: true },
  { speaker: '林澈', text: '现在最重要的不是猜结果，是尽快问专业的人。', choice: 'firstAction' },
];

function renderScene(scene) {
  els.sceneCounter.textContent = `${String(state.scene + 1).padStart(2, '0')} / 08`;
  els.speakerName.textContent = scene.speaker;
  els.dialogueText.textContent = scene.text;
  els.dialogueActions.innerHTML = '';
  els.choicePanel.hidden = true;
  els.interactionPanel.hidden = true;
  els.endingPanel.hidden = true;
  els.conversationPanel.hidden = false;
  els.hotspotHint.hidden = true;
  if (scene.near) { els.xiao.classList.add('is-near'); els.lin.classList.add('is-near'); }
  if (scene.choice) showChoices(scene.choice);
  else {
    const button = document.createElement('button');
    button.className = 'continue-button';
    button.type = 'button';
    button.innerHTML = `${scene.next || '继续'} <span>→</span>`;
    button.addEventListener('click', advance);
    els.dialogueActions.appendChild(button);
  }
}

function advance() {
  state.scene += 1;
  if (state.scene < scenes.length) renderScene(scenes[state.scene]);
  else showExposureChoice();
}

function createChoiceButton(key, label, fn) {
  const button = document.createElement('button');
  button.className = 'choice-button';
  button.type = 'button';
  button.innerHTML = `<span class="choice-key">${key}</span>${label}`;
  button.addEventListener('click', () => { els.choicePanel.hidden = true; fn(); });
  return button;
}

function showChoices(type) {
  const choices = {
    firstAction: [
      ['A', '现在就联系专业机构，先做评估。', () => { state.knowledge += 1; state.trust += 1; startCountdown(); }],
      ['B', '先搜一晚上症状，明天再说。', () => { state.anxiety += 2; state.delayCount += 1; spendTime(6); showDelayChoice(); }],
      ['C', '我们是不是已经感染了？', () => { state.anxiety += 2; state.trust += 1; showPanicChoice(); }],
    ],
    delay: [
      ['A', '不等了，现在就去问专业的人。', () => { state.knowledge += 1; startCountdown(); }],
      ['B', '再多查几条，确认一下症状。', () => { state.anxiety += 1; state.delayCount += 1; spendTime(8); showDelayChoice(); }],
      ['C', '先和林澈一起把暴露经过记下来。', () => { state.trust += 1; state.knowledge += 1; startCountdown(); }],
    ],
  };
  const selected = choices[type];
  els.choicePanel.hidden = false;
  els.choiceKicker.textContent = type === 'firstAction' ? '你准备先做什么' : '时间还在走';
  els.choiceList.innerHTML = '';
  selected.forEach(([key, label, fn]) => els.choiceList.appendChild(createChoiceButton(key, label, fn)));
}

function showExposureChoice() {
  state.scene = 4;
  els.speakerName.textContent = '林澈';
  els.dialogueText.textContent = '我们可能需要了解 PEP。先别把“可能暴露”当成“已经感染”。';
  els.dialogueActions.innerHTML = '';
  els.choicePanel.hidden = false;
  els.choiceKicker.textContent = '小安要怎么回应';
  els.choiceList.innerHTML = '';
  els.choiceList.appendChild(createChoiceButton('A', '现在就联系专业机构，先做评估。', () => { state.knowledge += 1; state.trust += 1; startCountdown(); }));
  els.choiceList.appendChild(createChoiceButton('B', '先搜一晚上症状，明天再说。', () => { state.anxiety += 2; state.delayCount += 1; spendTime(6); showDelayChoice(); }));
  els.choiceList.appendChild(createChoiceButton('C', '我们是不是已经感染了？', () => { state.anxiety += 2; state.trust += 1; showPanicChoice(); }));
}

function showDelayChoice() {
  showDialogue('旁白', `搜索结果越看越多，倒计时却从 72 小时变成了 ${formatHours()}。`, '把时间用在行动上', () => showChoices('delay'));
}

function showPanicChoice() {
  showDialogue('林澈', '高风险暴露不等于已经感染。我们现在能做的，是尽快获得专业评估。', '我陪你去', () => { state.trust += 1; startCountdown(); });
}

function showDialogue(speaker, text, nextText, nextFn) {
  els.conversationPanel.hidden = false;
  els.choicePanel.hidden = true;
  els.interactionPanel.hidden = true;
  els.endingPanel.hidden = true;
  els.speakerName.textContent = speaker;
  els.dialogueText.textContent = text;
  els.dialogueActions.innerHTML = '';
  const button = document.createElement('button');
  button.className = 'continue-button';
  button.type = 'button';
  button.innerHTML = `${nextText} <span>→</span>`;
  button.addEventListener('click', nextFn);
  els.dialogueActions.appendChild(button);
}

function spendTime(hours) {
  state.hoursRemaining = Math.max(1, state.hoursRemaining - hours);
  updateCountdown();
}

function formatHours() {
  return `${String(state.hoursRemaining).padStart(2, '0')}:00:00`;
}

function updateCountdown() {
  els.countdownText.textContent = formatHours();
  els.countdownBadge.classList.toggle('is-urgent', state.hoursRemaining <= 24);
}

function startCountdown() {
  state.actionStarted = true;
  els.countdownBadge.hidden = false;
  els.stageNote.textContent = '暴露后 · 现在';
  els.sceneSticker.textContent = '越早行动，越有帮助';
  updateCountdown();
  showDialogue('旁白', `暴露后计时开始：${formatHours()}。PEP 应尽早启动，最迟不超过 72 小时。`, '排好行动顺序', showActionBoard);
}

const actionSteps = [
  { title: '先停止原地恐慌', copy: '把“焦虑”拖到行动区，提醒自己：高风险暴露不等于已经感染。', tag: 'CALM', done: '先稳住。接下来要做的是专业评估。' },
  { title: '尽快寻求专业评估', copy: '把“专业机构”拖到行动区，说明暴露时间、方式和是否有防护。', tag: 'HELP', done: '评估不是靠猜症状，而是由专业人员判断是否符合 PEP 条件。' },
  { title: '按医嘱了解并启动 PEP', copy: '把“PEP”拖到行动区：是否使用、如何用药，都要遵循专业建议。', tag: 'PEP', done: 'PEP 越早开始越好，通常需要连续服用 28 天，具体按专业医嘱完成并复查。' },
];

function showActionBoard() {
  els.conversationPanel.hidden = true;
  els.choicePanel.hidden = true;
  els.endingPanel.hidden = true;
  els.interactionPanel.hidden = false;
  state.interactionStep = 0;
  updateActionStep();
}

function updateActionStep() {
  const step = actionSteps[state.interactionStep];
  els.interactionTitle.textContent = step.title;
  els.interactionCopy.textContent = step.copy;
  els.stepCount.textContent = `${state.interactionStep + 1} / ${actionSteps.length}`;
  els.stepActions.innerHTML = '';
  els.dragZone.classList.remove('is-over');
  els.dragZone.querySelector('span').textContent = '行动区';
  els.draggablePack.style.left = '70%';
  els.draggablePack.style.top = '45px';
  els.draggablePack.style.opacity = '1';
  els.draggablePack.innerHTML = `<span>${step.tag}</span><i></i>`;
}

function completeActionStep() {
  const step = actionSteps[state.interactionStep];
  els.interactionCopy.textContent = step.done;
  els.draggablePack.style.opacity = '.2';
  if (state.interactionStep === 0) state.anxiety = Math.max(0, state.anxiety - 1);
  if (state.interactionStep === 1) state.knowledge += 1;
  if (state.interactionStep === 2) state.knowledge += 1;
  const button = document.createElement('button');
  button.className = 'continue-button';
  button.type = 'button';
  button.innerHTML = state.interactionStep === actionSteps.length - 1 ? '继续 <span>→</span>' : '下一步 <span>→</span>';
  button.addEventListener('click', () => {
    if (state.interactionStep === actionSteps.length - 1) showFollowUp();
    else { state.interactionStep += 1; updateActionStep(); }
  });
  els.stepActions.innerHTML = '';
  els.stepActions.appendChild(button);
}

function showFollowUp() {
  els.interactionPanel.hidden = true;
  showDialogue('林澈', '如果未来存在持续的暴露风险，也可以在专业机构了解 PrEP（暴露前预防）。它和 PEP 不是同一件事。', '我记住了', () => finishEnding(state.delayCount > 0 ? 'late' : 'timely'));
}

function finishEnding(kind) {
  els.conversationPanel.hidden = true;
  els.choicePanel.hidden = true;
  els.interactionPanel.hidden = true;
  els.endingPanel.hidden = false;
  const endings = {
    timely: {
      title: '把 72 小时用在行动上',
      text: '你们没有靠症状猜答案，也没有把“可能暴露”当成“已经感染”。你们及时寻求专业评估，了解了 PEP，也知道以后可以咨询 PrEP。',
      tags: ['及时求助', '了解 PEP', '不把恐惧当结论'],
    },
    late: {
      title: '差一点把时间留给了焦虑',
      text: '你们后来还是去寻求了专业帮助，但反复搜索和拖延让行动窗口变窄。下一次，先行动，再处理那些无法靠搜索确认的担心。',
      tags: ['及时行动很重要', '高风险不等于感染', '继续寻求专业建议'],
    },
  };
  const ending = endings[kind] || endings.timely;
  els.endingTitle.textContent = ending.title;
  els.endingText.textContent = ending.text;
  els.endingStats.innerHTML = ending.tags.map((tag) => `<span class="ending-stat">${tag}</span>`).join('');
}

function resetGame() {
  state.scene = 0;
  state.trust = 0;
  state.knowledge = 0;
  state.anxiety = 0;
  state.hoursRemaining = 72;
  state.actionStarted = false;
  state.interactionStep = 0;
  state.delayCount = 0;
  els.xiao.classList.remove('is-near');
  els.lin.classList.remove('is-near');
  els.countdownBadge.hidden = true;
  els.stageNote.textContent = '周六 · 03:20';
  els.sceneSticker.textContent = '先保护，再判断';
  renderScene(scenes[0]);
}

document.querySelectorAll('.hotspot').forEach((hotspot) => {
  hotspot.addEventListener('click', () => {
    const kind = hotspot.dataset.hotspot;
    if (kind === 'phone') {
      els.sceneSticker.textContent = '消息：先把暴露经过说清楚';
      els.hotspotHint.hidden = false;
    } else if (kind === 'drink') {
      els.sceneSticker.textContent = '先喝口水，再一起行动';
      els.hotspotHint.hidden = false;
    } else if (kind === 'pack') {
      els.sceneSticker.textContent = '暴露前防护：安全套要正确、全程使用';
      els.hotspotHint.hidden = false;
    }
  });
});

let drag = null;
els.draggablePack.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  drag = { startX: event.clientX, startY: event.clientY, left: els.draggablePack.offsetLeft, top: els.draggablePack.offsetTop };
  els.draggablePack.setPointerCapture(event.pointerId);
});
els.draggablePack.addEventListener('pointermove', (event) => {
  if (!drag) return;
  els.draggablePack.style.left = `${drag.left + event.clientX - drag.startX}px`;
  els.draggablePack.style.top = `${drag.top + event.clientY - drag.startY}px`;
  const a = els.draggablePack.getBoundingClientRect();
  const b = els.dragZone.getBoundingClientRect();
  els.dragZone.classList.toggle('is-over', a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top);
});
els.draggablePack.addEventListener('pointerup', () => {
  if (!drag) return;
  const a = els.draggablePack.getBoundingClientRect();
  const b = els.dragZone.getBoundingClientRect();
  const overlaps = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  drag = null;
  if (overlaps) completeActionStep();
  else { els.draggablePack.style.left = '70%'; els.draggablePack.style.top = '45px'; els.dragZone.classList.remove('is-over'); }
});
els.draggablePack.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') completeActionStep();
});

document.getElementById('restartButton').addEventListener('click', resetGame);
document.getElementById('endingRestart').addEventListener('click', resetGame);
resetGame();
