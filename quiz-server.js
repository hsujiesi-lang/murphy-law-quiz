const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 3000;

// Serve static files
const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, 'public', filePath);

  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain; charset=utf-8' });
    res.end(data);
  });
});

const wss = new WebSocketServer({ server });

// ===== Quiz Questions =====
const questions = [
  {
    q: "「鏡中自我」的核心概念是什麼？",
    options: [
      "人的自我觀是透過與他人的互動形成的",
      "人只能透過照鏡子才能認識自己",
      "人的外貌決定了自我價值",
      "自我認知完全來自於個人的內省"
    ],
    answer: 0,
    explanation: "「鏡中自我」由社會學家庫利提出，認為我們對自己的認識來自於他人對我們的反應，就像照鏡子一樣，透過他人這面「鏡子」來認識自己。"
  },
  {
    q: "「自利偏誤」指的是哪種心理現象？",
    options: [
      "人們總是低估自己的能力",
      "成功歸因於自己，失敗歸咎於外在因素",
      "人們總是高估他人的成就",
      "失敗歸因於自己，成功歸功於運氣"
    ],
    answer: 1,
    explanation: "自利偏誤是指人傾向於將成功歸功於自身能力，卻將失敗歸咎於運氣差或外在環境，以此維護自尊心。"
  },
  {
    q: "「定錨效應」描述的是什麼現象？",
    options: [
      "船需要錨才能停穩",
      "人在做決策時會被最初接收到的資訊所影響",
      "人總是固守自己最初的想法不改變",
      "價格越高的商品品質一定越好"
    ],
    answer: 1,
    explanation: "定錨效應指人在做判斷時，會過度依賴最先接收到的資訊（即「錨點」），後續的判斷都會圍繞這個錨點進行調整。"
  },
  {
    q: "「瓦倫達效應」告訴我們什麼道理？",
    options: [
      "練習越多表現越好",
      "過度在意結果、患得患失反而容易失敗",
      "只要有信心就一定能成功",
      "壓力越大表現越好"
    ],
    answer: 1,
    explanation: "鋼索表演家瓦倫達在最重要的一次表演前過度擔心失敗，結果真的失足身亡。專注於過程而非結果，才能發揮最佳表現。"
  },
  {
    q: "「庫里肖夫效應」的核心意涵是什麼？",
    options: [
      "電影的剪輯技術決定了影片品質",
      "人們會將自己的經驗和情緒投射到所看到的事物上",
      "演員的表演技巧是電影成功的關鍵",
      "觀眾只相信自己親眼看到的事實"
    ],
    answer: 1,
    explanation: "庫里肖夫實驗發現，同一張面無表情的臉搭配不同畫面，觀眾會「看到」不同情緒，證明人會主動投射自己的感受到事物上。"
  },
  {
    q: "「墨菲定律」的核心主張是什麼？",
    options: [
      "只要努力就一定會成功",
      "凡事都有最好的結果",
      "如果有可能出錯，就一定會出錯",
      "計劃永遠趕不上變化"
    ],
    answer: 2,
    explanation: "墨菲定律的核心是：凡是有可能出錯的事，就一定會出錯。因此我們應該提前做好防範和準備。"
  },
  {
    q: "「醞釀效應」建議我們遇到難題時應該怎麼做？",
    options: [
      "不斷鑽研直到找到答案",
      "立刻請教他人",
      "暫時放下問題去做其他事，讓潛意識處理",
      "徹底放棄這個問題"
    ],
    answer: 2,
    explanation: "醞釀效應指暫時擱置問題後，潛意識會在背景中繼續處理，往往在不經意間靈感乍現，找到解決方案。"
  },
  {
    q: "「羊群效應」又被稱為什麼？",
    options: [
      "蝴蝶效應",
      "骨牌效應",
      "從眾效應",
      "連鎖效應"
    ],
    answer: 2,
    explanation: "羊群效應又稱從眾效應，形容人們像羊群一樣盲目跟隨多數人的行為，缺乏獨立思考和判斷。"
  },
  {
    q: "「巴南效應」為什麼讓人容易相信星座性格描述？",
    options: [
      "因為星座確實能準確描述性格",
      "因為人們只記住符合的部分",
      "因為模糊的描述適用於大多數人，人們會自動對號入座",
      "因為每個星座的描述都不一樣"
    ],
    answer: 2,
    explanation: "巴南效應指人們容易把模糊、籠統的性格描述當成專門為自己量身定做的，因為這些描述其實適用於大部分人。"
  },
  {
    q: "「奧坎剃刀」的原則可以概括為什麼？",
    options: [
      "越複雜的理論越正確",
      "所有理論都不可信",
      "如無必要，勿增實體（越簡潔越好）",
      "剃刀是最好的工具"
    ],
    answer: 2,
    explanation: "奧坎剃刀主張「如無必要，勿增實體」，意即在多個解釋中，最簡潔的那個往往最接近事實。"
  },
  {
    q: "「踢貓效應」描述的是什麼現象？",
    options: [
      "人們喜歡虐待動物",
      "壞情緒沿著社會關係鏈條由強到弱依次傳遞",
      "貓是最容易受傷的動物",
      "養貓可以減輕壓力"
    ],
    answer: 1,
    explanation: "踢貓效應指壞情緒像鏈條一樣，從社會地位高的人傳到低的人：老闆罵主管→主管罵員工→員工回家罵孩子→孩子踢貓。"
  },
  {
    q: "「野馬結局」想告訴我們什麼？",
    options: [
      "野馬跑得比蝙蝠快",
      "自然界弱肉強食是正常的",
      "憤怒是一種傷人又害己的情緒，過度憤怒會摧毀自己",
      "動物比人類更懂得控制情緒"
    ],
    answer: 2,
    explanation: "野馬被吸血蝙蝠叮咬後，因為暴怒狂奔而力竭身亡，蝙蝠吸的血其實很少。真正殺死野馬的不是蝙蝠，而是牠自己的憤怒。"
  },
  {
    q: "「霍桑效應」的核心發現是什麼？",
    options: [
      "改善物質條件就能提高生產效率",
      "工資越高員工越努力",
      "宣洩負面情緒、獲得關注有助於提升工作表現",
      "工作時間越長產出越多"
    ],
    answer: 2,
    explanation: "霍桑實驗發現，當員工感到被關注、有機會宣洩情緒時，工作效率會顯著提升，證明心理因素比物質條件更重要。"
  },
  {
    q: "「習得無助」是什麼意思？",
    options: [
      "天生就沒有能力的人",
      "因長期負面經驗而喪失信心，認為一切無法改變",
      "學習能力不足的狀態",
      "無法從他人那裡得到幫助"
    ],
    answer: 1,
    explanation: "習得無助是指個體在反覆經歷失敗與挫折後，逐漸相信自己無力改變現狀，即使有機會也不再嘗試。"
  },
  {
    q: "「約拿情結」描述的是哪種矛盾心理？",
    options: [
      "害怕失敗所以不敢嘗試",
      "渴望成功但又害怕成功帶來的壓力和變化",
      "嫉妒他人的成功",
      "覺得自己不配擁有任何東西"
    ],
    answer: 1,
    explanation: "約拿情結指人在面對成長和成功的機會時，既渴望又恐懼，害怕成功後要承擔更大的責任和改變。"
  },
  {
    q: "「目標設定理論」認為什麼樣的目標最能激勵人？",
    options: [
      "越高越好的目標",
      "容易達成的簡單目標",
      "具有挑戰性但又合理可達成的目標",
      "模糊且不具體的目標"
    ],
    answer: 2,
    explanation: "目標設定理論認為，目標要具體且有挑戰性但可達成，太難會讓人放棄，太簡單則缺乏動力。"
  },
  {
    q: "「瓦拉赫啟示」帶給我們什麼啟發？",
    options: [
      "應該全面發展，不能有弱項",
      "把時間和精力放在最擅長的領域，才能發揮最大價值",
      "短板決定了一個人的成就上限",
      "興趣比天賦更重要"
    ],
    answer: 1,
    explanation: "瓦拉赫原本文學和繪畫都不行，後來在化學領域找到天賦並獲得諾貝爾獎。啟示是要找到自己的優勢領域，專注發展。"
  },
  {
    q: "「內卷化效應」指的是什麼現象？",
    options: [
      "社會快速進步發展",
      "不斷投入資源卻停留在原地、沒有實質進步",
      "競爭越激烈表現越好",
      "內部團隊合作越來越緊密"
    ],
    answer: 1,
    explanation: "內卷化指一個系統在發展到一定階段後，無法突破瓶頸，只能不斷在原有層次上重複和精細化，卻沒有實質進步。"
  },
  {
    q: "「煮蛙效應」的寓意是什麼？",
    options: [
      "快速變化的環境最危險",
      "青蛙是最能適應環境的動物",
      "缺乏危機意識，對緩慢發生的危險渾然不覺",
      "要像青蛙一樣隨遇而安"
    ],
    answer: 2,
    explanation: "將青蛙放在慢慢加溫的水裡，牠不會跳走，直到被煮熟。比喻人對漸進式的危機缺乏警覺，等發現時已來不及。"
  },
  {
    q: "「馬太效應」描述的核心現象是什麼？",
    options: [
      "每個人機會均等",
      "強者越強、弱者越弱的兩極分化現象",
      "失敗是成功之母",
      "努力就一定能翻身"
    ],
    answer: 1,
    explanation: "馬太效應源自聖經：「凡有的，還要加給他。」描述資源和優勢會不斷向已有優勢的人集中，形成贏家通吃的局面。"
  },
  {
    q: "「安慰劑效應」的本質是什麼？",
    options: [
      "藥物的化學成分產生的治療效果",
      "醫生的專業能力帶來的治療效果",
      "潛意識的自我暗示帶來扭曲現實的力量",
      "只有心理疾病才會受到安慰劑影響"
    ],
    answer: 2,
    explanation: "安慰劑效應說明：當人相信某種治療有效時，即使是無效的「假藥」也能產生真實的改善，這是心理暗示的力量。"
  },
  {
    q: "墨菲定律帶給我們最大的啟示是什麼？",
    options: [
      "既然會出錯就不要做任何事",
      "只要夠樂觀就不會出錯",
      "事先做好周全的預備方案，防微杜漸",
      "出錯是別人的責任"
    ],
    answer: 2,
    explanation: "墨菲定律的正面啟示是：既然出錯是必然的，我們就應該預先規劃、做好萬全準備，而非心存僥倖。"
  },
  {
    q: "根據「鏡中自我」理論，一個人的自我評價主要來自於？",
    options: [
      "自己內心的獨立判斷",
      "社會回饋與他人的看法",
      "個人的學歷和成就",
      "父母從小的教導"
    ],
    answer: 1,
    explanation: "鏡中自我理論認為，我們是透過「想像別人如何看待自己」來形成自我評價的，他人的反應是我們認識自己的一面鏡子。"
  },
  {
    q: "「羊群效應」中的「阿希從眾實驗」證實了什麼？",
    options: [
      "人的視覺判斷能力很差",
      "群體壓力下，人們容易放棄自己的正確判斷而從眾",
      "只有愚笨的人才會從眾",
      "團體合作一定比個人好"
    ],
    answer: 1,
    explanation: "阿希實驗中，即使答案明顯錯誤，約75%的受試者至少有一次選擇了跟隨多數人的錯誤答案，顯示群體壓力對判斷的強大影響。"
  },
  {
    q: "「踢貓效應」給我們的啟示是什麼？",
    options: [
      "遠離所有有情緒的人",
      "要學會控制和疏導自己的情緒，不要傳染壞情緒",
      "地位越高的人越不會有壞情緒",
      "壞情緒只會影響弱者"
    ],
    answer: 1,
    explanation: "踢貓效應提醒我們：壞情緒會不斷傳遞並傷害無辜的人，因此要在自己這裡阻斷負面情緒的傳播鏈。"
  },
  {
    q: "面對「習得無助」的陷阱，最重要的是什麼？",
    options: [
      "接受命運的安排",
      "找更厲害的人幫忙",
      "保持自信和樂觀，不把挫折當作放棄的藉口",
      "完全避開所有可能失敗的事"
    ],
    answer: 2,
    explanation: "克服習得無助的關鍵是轉變思維：失敗是暫時的、可改變的，而非永久的、不可控的。保持積極心態是突破的第一步。"
  },
  {
    q: "「定錨效應」在商業中常見的應用是什麼？",
    options: [
      "降價促銷吸引顧客",
      "先給顧客設定一個參考點，影響其後續決策",
      "讓顧客自由選擇",
      "提供越多選項越好"
    ],
    answer: 1,
    explanation: "商家常先展示高價商品作為「錨點」，再推出相對便宜的選項，讓消費者覺得後者很划算，進而促進購買決策。"
  },
  {
    q: "如何避免「巴南效應」的影響？",
    options: [
      "完全不看任何性格分析",
      "只相信科學家說的話",
      "真正面對自己，學會分辨模糊描述和真實特徵",
      "多看幾個星座的描述來比較"
    ],
    answer: 2,
    explanation: "避免巴南效應的方法是培養批判性思維，認清那些「看似精準」的描述其實只是模糊的通用語句，真正了解自己才能不被迷惑。"
  },
  {
    q: "「醞釀效應」的心理學機制是什麼？",
    options: [
      "大腦完全停止工作休息",
      "思考過程轉入潛意識層面，在背景中重組資訊",
      "靠運氣突然想到答案",
      "是一種逃避問題的方式"
    ],
    answer: 1,
    explanation: "當我們暫時放下問題時，大腦並沒有停止思考，而是在潛意識中重新組織和整合資訊，往往能產生突破性的靈感。"
  },
  {
    q: "「瓦倫達效應」屬於哪種壓力類型？",
    options: [
      "良性壓力，能激發潛能",
      "完全沒有壓力的狀態",
      "不良壓力，源自患得患失的心態",
      "適度壓力，剛好能提升表現"
    ],
    answer: 2,
    explanation: "瓦倫達效應是一種不良壓力，因為過度擔心失敗的結果，反而無法專注當下，導致表現失常甚至失敗。"
  }
];

// ===== Game State =====
let gameState = 'waiting'; // waiting, playing, finished
let players = new Map(); // ws -> player object
let questionOrder = [];
const TOTAL_QUESTIONS = 15;
const TIME_LIMIT = 20;
const FEEDBACK_DELAY = 3000; // ms to show explanation before next question

function send(ws, data) {
  if (ws.readyState === 1) {
    ws.send(JSON.stringify(data));
  }
}

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(msg);
    }
  });
}

function getLeaderboard() {
  const list = [];
  players.forEach((p) => {
    list.push({ name: p.name, score: p.score, finished: p.questionIndex >= TOTAL_QUESTIONS });
  });
  list.sort((a, b) => b.score - a.score);
  return list;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startGame() {
  // Clean up any dead connections first
  players.forEach((p, ws) => {
    if (ws.readyState !== 1) {
      if (p.timer) clearInterval(p.timer);
      players.delete(ws);
    }
  });

  if (players.size === 0) return;

  questionOrder = shuffleArray(Array.from({ length: questions.length }, (_, i) => i)).slice(0, TOTAL_QUESTIONS);
  players.forEach(p => {
    if (p.timer) clearInterval(p.timer);
    p.score = 0;
    p.questionIndex = 0;
    p.answered = false;
    p.timer = null;
    p.questionStartTime = 0;
    p.finished = false;
  });
  gameState = 'playing';
  broadcast({ type: 'game_start', totalQuestions: TOTAL_QUESTIONS });
  // Send first question to each player
  players.forEach((p, ws) => {
    sendQuestionToPlayer(ws, p);
  });
}

function sendQuestionToPlayer(ws, player) {
  if (player.questionIndex >= TOTAL_QUESTIONS) {
    // This player is done
    player.finished = true;
    send(ws, {
      type: 'player_finished',
      score: player.score,
      leaderboard: getLeaderboard()
    });
    // Check if ALL players finished
    checkAllFinished();
    return;
  }

  const qIdx = questionOrder[player.questionIndex];
  const q = questions[qIdx];
  player.answered = false;
  player.questionStartTime = Date.now();

  send(ws, {
    type: 'question',
    index: player.questionIndex + 1,
    total: TOTAL_QUESTIONS,
    question: q.q,
    options: q.options,
    timeLimit: TIME_LIMIT
  });

  // Individual 20-second timer for this player
  if (player.timer) clearInterval(player.timer);
  let timeLeft = TIME_LIMIT;
  player.timer = setInterval(() => {
    timeLeft--;
    send(ws, { type: 'tick', timeLeft });
    if (timeLeft <= 0) {
      clearInterval(player.timer);
      player.timer = null;
      // Time's up — show correct answer, then move on
      if (!player.answered) {
        player.answered = true;
        const qIdx2 = questionOrder[player.questionIndex];
        const q2 = questions[qIdx2];
        send(ws, {
          type: 'answer_feedback', correct: false, points: 0, score: player.score,
          correctAnswer: q2.answer, explanation: q2.explanation, timeUp: true
        });
        // Broadcast updated leaderboard
        broadcast({ type: 'leaderboard_update', leaderboard: getLeaderboard() });
        // Move to next question after delay
        setTimeout(() => {
          player.questionIndex++;
          sendQuestionToPlayer(ws, player);
        }, FEEDBACK_DELAY);
      }
    }
  }, 1000);
}

function checkAllFinished() {
  let allDone = true;
  players.forEach(p => {
    if (p.questionIndex < TOTAL_QUESTIONS) allDone = false;
  });
  if (allDone && players.size > 0) {
    gameState = 'finished';
    broadcast({
      type: 'game_over',
      leaderboard: getLeaderboard()
    });
    setTimeout(() => {
      gameState = 'waiting';
      broadcast({ type: 'back_to_lobby', leaderboard: getLeaderboard() });
    }, 15000);
  }
}

function handleAnswer(ws, answerIndex) {
  const player = players.get(ws);
  if (!player || player.answered || gameState !== 'playing') return;

  player.answered = true;
  if (player.timer) {
    clearInterval(player.timer);
    player.timer = null;
  }

  const elapsed = (Date.now() - player.questionStartTime) / 1000;
  const qIdx = questionOrder[player.questionIndex];
  const q = questions[qIdx];
  const correct = answerIndex === q.answer;

  if (correct) {
    const timeBonus = Math.max(0, 1 - (elapsed / TIME_LIMIT));
    const points = Math.round(500 + 500 * timeBonus);
    player.score += points;
    send(ws, {
      type: 'answer_feedback', correct: true, points, score: player.score,
      correctAnswer: q.answer, explanation: q.explanation
    });
  } else {
    send(ws, {
      type: 'answer_feedback', correct: false, points: 0, score: player.score,
      correctAnswer: q.answer, explanation: q.explanation
    });
  }

  // Broadcast updated leaderboard to everyone
  broadcast({ type: 'leaderboard_update', leaderboard: getLeaderboard() });

  // After 3 seconds, send next question to this player
  setTimeout(() => {
    player.questionIndex++;
    sendQuestionToPlayer(ws, player);
  }, FEEDBACK_DELAY);
}

wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    let data;
    try { data = JSON.parse(raw); } catch { return; }

    if (data.type === 'join') {
      const name = (data.name || '').trim().substring(0, 20) || '匿名';
      players.set(ws, { name, score: 0, answered: false, questionIndex: 0, timer: null, questionStartTime: 0, finished: false });

      ws.send(JSON.stringify({
        type: 'joined',
        name,
        gameState,
        playerCount: players.size
      }));

      broadcast({
        type: 'player_update',
        playerCount: players.size,
        leaderboard: getLeaderboard()
      });

      // If game is already playing, let this player join mid-game
      if (gameState === 'playing' && questionOrder.length > 0) {
        const player = players.get(ws);
        send(ws, { type: 'game_start', totalQuestions: TOTAL_QUESTIONS });
        sendQuestionToPlayer(ws, player);
      }
    }

    if (data.type === 'start_game' && gameState === 'waiting') {
      startGame();
    }

    if (data.type === 'answer') {
      handleAnswer(ws, data.answer);
    }
  });

  ws.on('close', () => {
    const player = players.get(ws);
    if (player && player.timer) {
      clearInterval(player.timer);
    }
    players.delete(ws);
    broadcast({
      type: 'player_update',
      playerCount: players.size,
      leaderboard: getLeaderboard()
    });
    // If no players left, reset game state to waiting
    if (players.size === 0) {
      gameState = 'waiting';
    } else if (gameState === 'playing') {
      // Check if remaining players are all finished
      checkAllFinished();
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  墨菲定律心理學大挑戰 - 伺服器啟動！`);
  console.log(`  電腦端：http://localhost:${PORT}`);
  // Show local IP for mobile access
  const nets = require('os').networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`  手機端：http://${net.address}:${PORT}`);
      }
    }
  }
  console.log('');
});
