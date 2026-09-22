const state = {
  scene: 0,
  visited: new Set(),
  trust: 0,
  knowledge: 0,
  anxiety: 0,
  branch: null,
  interactionStep: 0,
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
  interactionBoard: document.getElementById('interactionBoard'),
  dragZone: document.getElementById('dragZone'),
  draggablePack: document.getElementById('draggablePack'),
  stepCount: document.getElementById('stepCount'),
  stepActions: document.getElementById('stepActions'),
  endingPanel: document.getElementById('endingPanel'),
  endingTitle: document.getElementById('endingTitle'),
  endingText: document.getElementById('endingText'),
  endingStats: document.getElementById('endingStats'),
  stage: document.getElementById('stage'),
  sceneCounter: document.getElementById('sceneCounter'),
  xiao: document.getElementById('xiaoCharacter'),
  lin: document.getElementById('linCharacter'),
};

const scenes = [
  { speaker: '旁白', text: '电影结束了。夜色把房间变得很安静。', next: '电影结束了。' },
  { speaker: '林澈', text: '已经一点多了。', next: '小安，你明天早上还有课吗？' },
  { speaker: '小安', text: '有啊。可是……你不是说今天想让我留下来吗？', next: '林澈没有否认，只是把手机扣在了桌上。', near: true },
  { speaker: '林澈', text: '我们都在一起这么久了，应该不用每次都弄得那么紧张吧？', choice: 'stability' },
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
  else showChoiceScene();
}

function showChoices(type) {
  const choices = {
    stability: [
      ['A', '在一起久了，也还是应该做好防护。', () => { state.knowledge += 1; state.trust += 1; showKeyLine('小安', '在一起久了，也还是应该把该确认的确认好。', '林澈听见了，没有马上反驳。'); }],
      ['B', '偶尔一次，应该没关系。', () => { state.anxiety += 1; state.branch = 'luck'; showKeyLine('林澈', '你看，我们都这么熟了。', '空气里有一小段没有被说完的沉默。'); }],
      ['C', '你是不是觉得我不信任你？', () => { state.trust -= 1; state.branch = 'tension'; showKeyLine('林澈', '我不是这个意思。', '他把手里的包装放回了桌面。'); }],
    ],
    key: [
      ['A', '先检查一下吧。', () => { state.knowledge += 1; state.trust += 1; showPreparationEntry(); }],
      ['B', '你说得也有道理。', () => { state.anxiety += 1; state.branch = 'luck'; showLuckEntry(); }],
      ['C', '我其实有点害怕，但不知道怕的是什么。', () => { state.anxiety += 1; state.trust += 1; state.branch = 'talk'; showTalkEntry(); }],
    ],
    talk: [
      ['A', '我只是想对我们负责。', () => { state.trust += 1; showKeyLine('林澈', '那我们就慢一点。', '先把该确认的确认好。'); }],
      ['B', '算了，别弄得这么麻烦。', () => { state.trust -= 1; showLuckEntry(); }],
      ['C', '我以前总觉得这种话很难说出口。', () => { state.trust += 1; showPreparationEntry(); }],
    ],
    pause: [
      ['A', '那我们今天先聊清楚。', () => { state.trust += 1; finishEnding('pause'); }],
      ['B', '我想继续，但要按照刚才确认的方式来。', () => { state.knowledge += 1; state.trust += 1; finishEnding('clear'); }],
      ['C', '我还是有点害怕，今晚先不做。', () => { state.anxiety -= 1; state.trust += 1; finishEnding('pause'); }],
    ],
  };
  const chosen = choices[type];
  els.choicePanel.hidden = false;
  els.choiceKicker.textContent = type === 'stability' ? '你想怎么回应' : '轮到你说';
  els.choiceList.innerHTML = '';
  chosen.forEach(([key, label, fn]) => {
    const button = document.createElement('button');
    button.className = 'choice-button';
    button.type = 'button';
    button.innerHTML = `<span class="choice-key">${key}</span>${label}`;
    button.addEventListener('click', () => { els.choicePanel.hidden = true; fn(); });
    els.choiceList.appendChild(button);
  });
}

function showKeyLine(speaker, text, nextText) {
  state.scene = Math.min(7, state.scene + 1);
  els.speakerName.textContent = speaker;
  els.dialogueText.textContent = text;
  els.dialogueActions.innerHTML = '';
  const button = document.createElement('button');
  button.className = 'continue-button';
  button.type = 'button';
  button.innerHTML = `${nextText} <span>→</span>`;
  button.addEventListener('click', () => showChoiceScene());
  els.dialogueActions.appendChild(button);
  els.conversationPanel.hidden = false;
}

function showChoiceScene() {
  state.scene = 4;
  els.speakerName.textContent = '林澈';
  els.dialogueText.textContent = '就这一次，应该没事吧？';
  els.dialogueActions.innerHTML = '';
  els.choicePanel.hidden = false;
  els.choiceKicker.textContent = '小安没有马上回答';
  els.choiceList.innerHTML = '';
  const choices = [
    ['A', '先检查一下吧。', () => { state.knowledge += 1; state.trust += 1; showPreparationEntry(); }],
    ['B', '偶尔一次，应该没关系。', () => { state.anxiety += 1; state.branch = 'luck'; showLuckEntry(); }],
    ['C', '我其实有点害怕，但不知道怕的是什么。', () => { state.anxiety += 1; state.trust += 1; state.branch = 'talk'; showTalkEntry(); }],
  ];
  choices.forEach(([key, label, fn]) => {
    const button = document.createElement('button');
    button.className = 'choice-button';
    button.type = 'button';
    button.innerHTML = `<span class="choice-key">${key}</span>${label}`;
    button.addEventListener('click', () => { els.choicePanel.hidden = true; fn(); });
    els.choiceList.appendChild(button);
  });
}

function showPreparationEntry() {
  els.conversationPanel.hidden = true;
  els.interactionPanel.hidden = false;
  state.interactionStep = 0;
  updateInteractionStep();
}

function showLuckEntry() {
  els.speakerName.textContent = '旁白';
  els.dialogueText.textContent = '第二天，小安独自坐在床边，不断搜索昨晚留下的疑问。';
  els.dialogueActions.innerHTML = '';
  els.conversationPanel.hidden = false;
  const backButton = document.createElement('button');
  backButton.className = 'continue-button'; backButton.type = 'button';
  backButton.innerHTML = '回到刚才 <span>↶</span>';
  backButton.addEventListener('click', showChoiceScene);
  const endButton = document.createElement('button');
  endButton.className = 'continue-button'; endButton.type = 'button';
  endButton.style.marginLeft = '20px';
  endButton.innerHTML = '先这样吧 <span>→</span>';
  endButton.addEventListener('click', () => finishEnding('luck'));
  els.dialogueActions.append(backButton, endButton);
  state.branch = 'luck';
}

function showTalkEntry() {
  els.speakerName.textContent = '林澈';
  els.dialogueText.textContent = '害怕也可以说出来，不用装作自己什么都懂。';
  els.dialogueActions.innerHTML = '';
  els.conversationPanel.hidden = false;
  const button = document.createElement('button');
  button.className = 'continue-button'; button.type = 'button';
  button.innerHTML = '继续说下去 <span>→</span>';
  button.addEventListener('click', () => showChoices('talk'));
  els.dialogueActions.appendChild(button);
}

const interactionSteps = [
  { title: '先看一眼安全套的包装', copy: '把包装拖到检查区，先确认它完整、没有破损。', done: '包装完整。下一步，看看有效期。' },
  { title: '确认有效期', copy: '点击检查区的日期标签，确认它仍在有效期内。', done: '日期没有问题。打开时也要小心，别用尖锐物品。' },
  { title: '分清正反面', copy: '拖动小圆点，把正面朝外的一侧放到高亮位置。', done: '方向正确。使用前捏住前端，排出空气。' },
  { title: '一直用到最后', copy: '把包装拖到人物之间的标记处，确认全程使用。', done: '完成。结束后扶住根部退出，再妥善处理。' },
];

function updateInteractionStep() {
  const step = interactionSteps[state.interactionStep];
  els.interactionTitle.textContent = step.title;
  els.interactionCopy.textContent = step.copy;
  els.stepCount.textContent = `${state.interactionStep + 1} / ${interactionSteps.length}`;
  els.stepActions.innerHTML = '';
  els.dragZone.classList.remove('is-over');
  els.draggablePack.style.left = '70%';
  els.draggablePack.style.top = '45px';
  els.draggablePack.style.opacity = '1';
  els.draggablePack.innerHTML = '<span>CARE</span><i></i>';
  if (state.interactionStep === 1) {
    els.draggablePack.innerHTML = '<span>DATE</span><i></i>';
    els.dragZone.querySelector('span').textContent = '日期';
  } else if (state.interactionStep === 2) {
    els.draggablePack.innerHTML = '<span>↺</span><i></i>';
    els.dragZone.querySelector('span').textContent = '正面';
  } else if (state.interactionStep === 3) {
    els.draggablePack.innerHTML = '<span>FULL</span><i></i>';
    els.dragZone.querySelector('span').textContent = '全程';
  } else {
    els.dragZone.querySelector('span').textContent = '检查区';
  }
}

function completeInteractionStep() {
  const step = interactionSteps[state.interactionStep];
  els.interactionCopy.textContent = step.done;
  els.draggablePack.style.opacity = '.2';
  const button = document.createElement('button');
  button.className = 'continue-button'; button.type = 'button';
  button.innerHTML = state.interactionStep === interactionSteps.length - 1 ? '继续 <span>→</span>' : '下一步 <span>→</span>';
  button.addEventListener('click', () => {
    if (state.interactionStep === interactionSteps.length - 1) showPauseChoice();
    else { state.interactionStep += 1; updateInteractionStep(); }
  });
  els.stepActions.innerHTML = '';
  els.stepActions.appendChild(button);
}

function showPauseChoice() {
  els.interactionPanel.hidden = true;
  els.conversationPanel.hidden = false;
  els.speakerName.textContent = '林澈';
  els.dialogueText.textContent = '如果你现在不确定，我们可以先停。';
  els.dialogueActions.innerHTML = '';
  showChoices('pause');
}

function finishEnding(kind) {
  els.conversationPanel.hidden = true;
  els.choicePanel.hidden = true;
  els.interactionPanel.hidden = true;
  els.endingPanel.hidden = false;
  const endings = {
    clear: {
      title: '先说清楚，再靠近',
      text: '你没有因为害怕而逃开，也没有用侥幸替自己做决定。你们开始学会在亲密之前，把边界和防护说清楚。',
      tags: ['沟通 +1', '防护认知 +1'],
    },
    pause: {
      title: '暂停也没关系',
      text: '今晚没有继续，不代表关系后退。你们愿意给彼此一点时间，也愿意把不确定说出来。',
      tags: ['边界感 +1', '信任 +1'],
    },
    luck: {
      title: '把问题留到明天',
      text: '“应该没事”不是答案。真正需要确认的时候，越早说清楚，越少留下猜测。',
      tags: ['侥幸倾向 ↑', '焦虑 ↑'],
    },
  };
  const ending = endings[kind] || endings.clear;
  els.endingTitle.textContent = ending.title;
  els.endingText.textContent = ending.text;
  els.endingStats.innerHTML = ending.tags.map((tag) => `<span class="ending-stat">${tag}</span>`).join('');
}

function resetGame() {
  state.scene = 0; state.visited.clear(); state.trust = 0; state.knowledge = 0; state.anxiety = 0; state.branch = null; state.interactionStep = 0;
  els.xiao.classList.remove('is-near'); els.lin.classList.remove('is-near');
  renderScene(scenes[0]);
}

document.querySelectorAll('.hotspot').forEach((hotspot) => {
  hotspot.addEventListener('click', () => {
    const kind = hotspot.dataset.hotspot;
    if (kind === 'phone') {
      els.sceneSticker.textContent = '“今晚能不能多待一会儿？”';
      els.hotspotHint.hidden = false;
    } else if (kind === 'drink') {
      els.sceneSticker.textContent = '他把饮料递给你';
      els.hotspotHint.hidden = false;
    } else if (kind === 'pack') {
      els.sceneSticker.textContent = '一件需要被认真对待的小事';
      els.hotspotHint.hidden = false;
    }
    state.visited.add(kind);
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
  const nextLeft = drag.left + (event.clientX - drag.startX);
  const nextTop = drag.top + (event.clientY - drag.startY);
  els.draggablePack.style.left = `${nextLeft}px`;
  els.draggablePack.style.top = `${nextTop}px`;
  const a = els.draggablePack.getBoundingClientRect();
  const b = els.dragZone.getBoundingClientRect();
  const overlaps = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  els.dragZone.classList.toggle('is-over', overlaps);
});
els.draggablePack.addEventListener('pointerup', (event) => {
  if (!drag) return;
  const a = els.draggablePack.getBoundingClientRect();
  const b = els.dragZone.getBoundingClientRect();
  const overlaps = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  drag = null;
  if (overlaps) completeInteractionStep(); else { els.draggablePack.style.left = '70%'; els.draggablePack.style.top = '45px'; els.dragZone.classList.remove('is-over'); }
});
els.draggablePack.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') completeInteractionStep();
});

document.getElementById('restartButton').addEventListener('click', resetGame);
document.getElementById('endingRestart').addEventListener('click', resetGame);
resetGame();
