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
// 60 questions, answers distributed evenly across A(0)/B(1)/C(2)/D(3)
// No same answer appears more than 2 times consecutively
const questions = [
  // 1 - A
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
  // 2 - B
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
  // 3 - D
  {
    q: "「定錨效應」描述的是什麼現象？",
    options: [
      "人總是固守自己最初的想法不改變",
      "船需要錨才能停穩",
      "價格越高的商品品質一定越好",
      "人在做決策時會被最初接收到的資訊所影響"
    ],
    answer: 3,
    explanation: "定錨效應指人在做判斷時，會過度依賴最先接收到的資訊（即「錨點」），後續的判斷都會圍繞這個錨點進行調整。"
  },
  // 4 - C
  {
    q: "「瓦倫達效應」告訴我們什麼道理？",
    options: [
      "練習越多表現越好",
      "壓力越大表現越好",
      "過度在意結果、患得患失反而容易失敗",
      "只要有信心就一定能成功"
    ],
    answer: 2,
    explanation: "鋼索表演家瓦倫達在最重要的一次表演前過度擔心失敗，結果真的失足身亡。專注於過程而非結果，才能發揮最佳表現。"
  },
  // 5 - A
  {
    q: "「庫里肖夫效應」的核心意涵是什麼？",
    options: [
      "人們會將自己的經驗和情緒投射到所看到的事物上",
      "電影的剪輯技術決定了影片品質",
      "演員的表演技巧是電影成功的關鍵",
      "觀眾只相信自己親眼看到的事實"
    ],
    answer: 0,
    explanation: "庫里肖夫實驗發現，同一張面無表情的臉搭配不同畫面，觀眾會「看到」不同情緒，證明人會主動投射自己的感受到事物上。"
  },
  // 6 - B
  {
    q: "「墨菲定律」的核心主張是什麼？",
    options: [
      "只要努力就一定會成功",
      "如果有可能出錯，就一定會出錯",
      "凡事都有最好的結果",
      "計劃永遠趕不上變化"
    ],
    answer: 1,
    explanation: "墨菲定律的核心是：凡是有可能出錯的事，就一定會出錯。因此我們應該提前做好防範和準備。"
  },
  // 7 - D
  {
    q: "「醞釀效應」建議我們遇到難題時應該怎麼做？",
    options: [
      "不斷鑽研直到找到答案",
      "立刻請教他人",
      "徹底放棄這個問題",
      "暫時放下問題去做其他事，讓潛意識處理"
    ],
    answer: 3,
    explanation: "醞釀效應指暫時擱置問題後，潛意識會在背景中繼續處理，往往在不經意間靈感乍現，找到解決方案。"
  },
  // 8 - C
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
  // 9 - A
  {
    q: "「巴南效應」為什麼讓人容易相信星座性格描述？",
    options: [
      "因為模糊的描述適用於大多數人，人們會自動對號入座",
      "因為星座確實能準確描述性格",
      "因為每個星座的描述都不一樣",
      "因為人們只記住符合的部分"
    ],
    answer: 0,
    explanation: "巴南效應指人們容易把模糊、籠統的性格描述當成專門為自己量身定做的，因為這些描述其實適用於大部分人。"
  },
  // 10 - B
  {
    q: "「奧坎剃刀」的原則可以概括為什麼？",
    options: [
      "越複雜的理論越正確",
      "如無必要，勿增實體（越簡潔越好）",
      "所有理論都不可信",
      "剃刀是最好的工具"
    ],
    answer: 1,
    explanation: "奧坎剃刀主張「如無必要，勿增實體」，意即在多個解釋中，最簡潔的那個往往最接近事實。"
  },
  // 11 - D
  {
    q: "「踢貓效應」描述的是什麼現象？",
    options: [
      "人們喜歡虐待動物",
      "貓是最容易受傷的動物",
      "養貓可以減輕壓力",
      "壞情緒沿著社會關係鏈條由強到弱依次傳遞"
    ],
    answer: 3,
    explanation: "踢貓效應指壞情緒像鏈條一樣，從社會地位高的人傳到低的人：老闆罵主管→主管罵員工→員工回家罵孩子→孩子踢貓。"
  },
  // 12 - C
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
  // 13 - A
  {
    q: "「霍桑效應」的核心發現是什麼？",
    options: [
      "宣洩負面情緒、獲得關注有助於提升工作表現",
      "改善物質條件就能提高生產效率",
      "工資越高員工越努力",
      "工作時間越長產出越多"
    ],
    answer: 0,
    explanation: "霍桑實驗發現，當員工感到被關注、有機會宣洩情緒時，工作效率會顯著提升，證明心理因素比物質條件更重要。"
  },
  // 14 - D
  {
    q: "「習得無助」是什麼意思？",
    options: [
      "天生就沒有能力的人",
      "學習能力不足的狀態",
      "無法從他人那裡得到幫助",
      "因長期負面經驗而喪失信心，認為一切無法改變"
    ],
    answer: 3,
    explanation: "習得無助是指個體在反覆經歷失敗與挫折後，逐漸相信自己無力改變現狀，即使有機會也不再嘗試。"
  },
  // 15 - B
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
  // 16 - C
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
  // 17 - A
  {
    q: "「瓦拉赫啟示」帶給我們什麼啟發？",
    options: [
      "把時間和精力放在最擅長的領域，才能發揮最大價值",
      "應該全面發展，不能有弱項",
      "短板決定了一個人的成就上限",
      "興趣比天賦更重要"
    ],
    answer: 0,
    explanation: "瓦拉赫原本文學和繪畫都不行，後來在化學領域找到天賦並獲得諾貝爾獎。啟示是要找到自己的優勢領域，專注發展。"
  },
  // 18 - D
  {
    q: "「內卷化效應」指的是什麼現象？",
    options: [
      "社會快速進步發展",
      "競爭越激烈表現越好",
      "內部團隊合作越來越緊密",
      "不斷投入資源卻停留在原地、沒有實質進步"
    ],
    answer: 3,
    explanation: "內卷化指一個系統在發展到一定階段後，無法突破瓶頸，只能不斷在原有層次上重複和精細化，卻沒有實質進步。"
  },
  // 19 - B
  {
    q: "「煮蛙效應」的寓意是什麼？",
    options: [
      "快速變化的環境最危險",
      "缺乏危機意識，對緩慢發生的危險渾然不覺",
      "青蛙是最能適應環境的動物",
      "要像青蛙一樣隨遇而安"
    ],
    answer: 1,
    explanation: "將青蛙放在慢慢加溫的水裡，牠不會跳走，直到被煮熟。比喻人對漸進式的危機缺乏警覺，等發現時已來不及。"
  },
  // 20 - C
  {
    q: "「馬太效應」描述的核心現象是什麼？",
    options: [
      "每個人機會均等",
      "失敗是成功之母",
      "強者越強、弱者越弱的兩極分化現象",
      "努力就一定能翻身"
    ],
    answer: 2,
    explanation: "馬太效應源自聖經：「凡有的，還要加給他。」描述資源和優勢會不斷向已有優勢的人集中，形成贏家通吃的局面。"
  },
  // 21 - A
  {
    q: "「安慰劑效應」的本質是什麼？",
    options: [
      "潛意識的自我暗示帶來扭曲現實的力量",
      "藥物的化學成分產生的治療效果",
      "醫生的專業能力帶來的治療效果",
      "只有心理疾病才會受到安慰劑影響"
    ],
    answer: 0,
    explanation: "安慰劑效應說明：當人相信某種治療有效時，即使是無效的「假藥」也能產生真實的改善，這是心理暗示的力量。"
  },
  // 22 - D
  {
    q: "墨菲定律帶給我們最大的啟示是什麼？",
    options: [
      "既然會出錯就不要做任何事",
      "只要夠樂觀就不會出錯",
      "出錯是別人的責任",
      "事先做好周全的預備方案，防微杜漸"
    ],
    answer: 3,
    explanation: "墨菲定律的正面啟示是：既然出錯是必然的，我們就應該預先規劃、做好萬全準備，而非心存僥倖。"
  },
  // 23 - B
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
  // 24 - C
  {
    q: "「阿希從眾實驗」證實了什麼？",
    options: [
      "人的視覺判斷能力很差",
      "只有愚笨的人才會從眾",
      "群體壓力下，人們容易放棄自己的正確判斷而從眾",
      "團體合作一定比個人好"
    ],
    answer: 2,
    explanation: "阿希實驗中，即使答案明顯錯誤，約75%的受試者至少有一次選擇了跟隨多數人的錯誤答案，顯示群體壓力對判斷的強大影響。"
  },
  // 25 - A
  {
    q: "「踢貓效應」給我們的啟示是什麼？",
    options: [
      "要學會控制和疏導自己的情緒，不要傳染壞情緒",
      "遠離所有有情緒的人",
      "地位越高的人越不會有壞情緒",
      "壞情緒只會影響弱者"
    ],
    answer: 0,
    explanation: "踢貓效應提醒我們：壞情緒會不斷傳遞並傷害無辜的人，因此要在自己這裡阻斷負面情緒的傳播鏈。"
  },
  // 26 - D
  {
    q: "面對「習得無助」的陷阱，最重要的是什麼？",
    options: [
      "接受命運的安排",
      "找更厲害的人幫忙",
      "完全避開所有可能失敗的事",
      "保持自信和樂觀，不把挫折當作放棄的藉口"
    ],
    answer: 3,
    explanation: "克服習得無助的關鍵是轉變思維：失敗是暫時的、可改變的，而非永久的、不可控的。保持積極心態是突破的第一步。"
  },
  // 27 - B
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
  // 28 - C
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
  // 29 - A
  {
    q: "「醞釀效應」的心理學機制是什麼？",
    options: [
      "思考過程轉入潛意識層面，在背景中重組資訊",
      "大腦完全停止工作休息",
      "靠運氣突然想到答案",
      "是一種逃避問題的方式"
    ],
    answer: 0,
    explanation: "當我們暫時放下問題時，大腦並沒有停止思考，而是在潛意識中重新組織和整合資訊，往往能產生突破性的靈感。"
  },
  // 30 - D
  {
    q: "「瓦倫達效應」屬於哪種壓力類型？",
    options: [
      "良性壓力，能激發潛能",
      "完全沒有壓力的狀態",
      "適度壓力，剛好能提升表現",
      "不良壓力，源自患得患失的心態"
    ],
    answer: 3,
    explanation: "瓦倫達效應是一種不良壓力，因為過度擔心失敗的結果，反而無法專注當下，導致表現失常甚至失敗。"
  },
  // 31 - B
  {
    q: "「破窗效應」的核心概念是什麼？",
    options: [
      "窗戶很容易被打破",
      "環境中的小問題若不及時處理，會引發更大的問題",
      "建築設計決定了犯罪率",
      "社區安全完全取決於警察巡邏"
    ],
    answer: 1,
    explanation: "破窗效應指一棟建築的破窗若不修理，人們就會認為這裡無人管理，進而打破更多窗戶，最終整個環境惡化。"
  },
  // 32 - C
  {
    q: "「沉沒成本謬誤」是指什麼？",
    options: [
      "投資越多回報越大",
      "省錢是最好的理財方式",
      "因為已經投入了大量成本，而不願放棄明顯失敗的計劃",
      "所有成本都可以回收"
    ],
    answer: 2,
    explanation: "沉沒成本謬誤是指人因為已經投入了時間、金錢或精力，即使知道繼續下去不划算，仍然不願意放棄，被過去的投入綁架了決策。"
  },
  // 33 - A
  {
    q: "「光環效應」描述的是什麼現象？",
    options: [
      "對一個人某方面的好印象會擴展到對他整體的評價",
      "光線會影響人的情緒",
      "名人說的話一定是對的",
      "外表好看的人運氣比較好"
    ],
    answer: 0,
    explanation: "光環效應指當我們對一個人的某個特質有好印象時，會傾向於認為他在其他方面也很優秀，形成以偏概全的認知偏差。"
  },
  // 34 - D
  {
    q: "「達克效應」揭示了什麼有趣的現象？",
    options: [
      "越聰明的人越成功",
      "學歷越高知識越多",
      "人越老越有智慧",
      "能力越差的人越容易高估自己的能力"
    ],
    answer: 3,
    explanation: "達克效應指能力不足的人往往無法認識到自己的不足，反而高估自己的水平；而真正有能力的人卻常常低估自己。"
  },
  // 35 - B
  {
    q: "「鳥籠效應」的核心意思是什麼？",
    options: [
      "養鳥可以帶來好運",
      "人們會因為擁有某個事物，而被迫做出與之匹配的行為",
      "鳥類的行為和人類很相似",
      "空間越大越自由"
    ],
    answer: 1,
    explanation: "如果別人送你一個鳥籠，客人不斷問「鳥呢？」最終你很可能真的去買一隻鳥。這說明人容易被外在事物驅動行為。"
  },
  // 36 - C
  {
    q: "「旁觀者效應」說明了什麼現象？",
    options: [
      "人越多越安全",
      "圍觀的人都很冷漠",
      "在場的人越多，每個人出手幫忙的可能性越低",
      "只有英雄才會挺身而出"
    ],
    answer: 2,
    explanation: "旁觀者效應指在緊急情況下，旁觀者越多，個人採取行動的可能性越低，因為每個人都認為「別人會去做」，責任被分散了。"
  },
  // 37 - A
  {
    q: "「蔡格尼克效應」是指什麼心理現象？",
    options: [
      "人對未完成的事情記憶更深刻",
      "人只記得開心的事",
      "完成任務後會立刻忘記細節",
      "重複做同一件事會越來越快"
    ],
    answer: 0,
    explanation: "蔡格尼克效應指人對於尚未完成的任務會有更深刻的記憶和持續的關注，完成後反而容易遺忘。這也是為什麼追劇的懸念讓人念念不忘。"
  },
  // 38 - D
  {
    q: "「刺蝟法則」告訴我們什麼道理？",
    options: [
      "人應該盡量遠離他人",
      "越親密的關係越好",
      "刺蝟的刺可以保護自己",
      "人際交往需要保持適當的距離"
    ],
    answer: 3,
    explanation: "兩隻刺蝟在寒冬靠近取暖，太近會互相刺痛，太遠又會冷。人際關係也是如此，需要找到一個舒適的距離。"
  },
  // 39 - B
  {
    q: "「首因效應」強調的是什麼？",
    options: [
      "最後的印象最深刻",
      "第一印象對後續判斷有巨大影響",
      "重複出現的印象最重要",
      "中間的訊息最容易記住"
    ],
    answer: 1,
    explanation: "首因效應指人與人初次交往時形成的第一印象，會在對方腦中佔據主導地位，影響後續的認知和判斷。"
  },
  // 40 - C
  {
    q: "「近因效應」和首因效應相反，它指的是什麼？",
    options: [
      "人只記得最初的印象",
      "空間距離決定了好感度",
      "最近一次的印象對判斷影響最大",
      "越早的記憶越清晰"
    ],
    answer: 2,
    explanation: "近因效應指在多次互動中，最近一次的印象會對人的判斷產生最大影響，可能蓋過之前累積的印象。"
  },
  // 41 - A
  {
    q: "「倖存者偏差」是什麼意思？",
    options: [
      "只看到成功案例而忽略大量失敗案例，導致判斷偏差",
      "經歷過危險的人會更加小心",
      "失敗者的經驗沒有價值",
      "成功的人都有相同的特質"
    ],
    answer: 0,
    explanation: "倖存者偏差指我們只看到了「存活下來」的樣本，卻忽略了被淘汰的大多數。例如只看成功創業者的故事，卻忽略了99%失敗的人。"
  },
  // 42 - D
  {
    q: "「稟賦效應」會讓人產生什麼心理？",
    options: [
      "總是想要得到別人的東西",
      "對新事物充滿好奇心",
      "對未擁有的東西評價更高",
      "對已經擁有的東西估值過高，不願意失去"
    ],
    answer: 3,
    explanation: "稟賦效應指人一旦擁有某物，就會對其賦予更高的價值。同一個杯子，擁有者開價往往是買家願付價格的兩倍以上。"
  },
  // 43 - B
  {
    q: "「峰終定律」的核心觀點是什麼？",
    options: [
      "事情的開頭最重要",
      "人對一段體驗的記憶主要取決於高峰和結尾的感受",
      "體驗的長度決定了滿意度",
      "過程比結果重要"
    ],
    answer: 1,
    explanation: "峰終定律指人對一段體驗的整體評價，主要由體驗中的最高峰（最好或最壞的時刻）和結束時的感受決定，而非整體平均。"
  },
  // 44 - C
  {
    q: "「損失厭惡」心理會導致什麼行為？",
    options: [
      "人們喜歡冒險追求高回報",
      "人們對獲得和損失的感受相同",
      "失去某物的痛苦遠大於得到同等價值物品的快樂",
      "人們總是做出最理性的決策"
    ],
    answer: 2,
    explanation: "損失厭惡指人們對損失的敏感度約是獲得的兩倍。丟掉100元的痛苦感，遠大於撿到100元的快樂感。"
  },
  // 45 - A
  {
    q: "「從眾心理」在日常生活中最常見的表現是什麼？",
    options: [
      "看到排隊的餐廳就覺得一定好吃",
      "堅持自己的判斷不受他人影響",
      "反對多數人的意見",
      "不在乎別人的想法"
    ],
    answer: 0,
    explanation: "從眾心理讓人傾向於跟隨多數人的選擇。看到長隊就覺得「這麼多人排一定好」，這是典型的從眾行為。"
  },
  // 46 - D
  {
    q: "「認知失調」是指什麼狀態？",
    options: [
      "記憶力衰退的現象",
      "無法集中注意力",
      "學習新知識的困難",
      "當行為與信念矛盾時產生的心理不適感"
    ],
    answer: 3,
    explanation: "認知失調指當人的行為與原有信念產生矛盾時，會感到不舒服，進而調整信念或行為來消除這種不適感。"
  },
  // 47 - B
  {
    q: "「螃蟹效應」描述的是什麼現象？",
    options: [
      "螃蟹總是橫著走路",
      "群體中的人互相拉後腿，阻止他人超越自己",
      "團隊合作能讓所有人一起成功",
      "競爭可以激發每個人的最佳表現"
    ],
    answer: 1,
    explanation: "把一群螃蟹放在桶裡，沒有一隻能爬出去，因為每當一隻要爬上去時就被其他螃蟹拉下來。比喻群體中互相妨礙的現象。"
  },
  // 48 - C
  {
    q: "「選擇悖論」告訴我們什麼？",
    options: [
      "選擇越多越幸福",
      "人應該避免做選擇",
      "過多的選擇反而會讓人焦慮，降低滿意度",
      "只有一個選項時最容易做決定"
    ],
    answer: 2,
    explanation: "心理學家施瓦茨發現，當選擇太多時，人們反而更難做決定、更容易後悔，因為總覺得「另一個選擇可能更好」。"
  },
  // 49 - A
  {
    q: "「框架效應」是如何影響人的判斷的？",
    options: [
      "同樣的資訊用不同方式呈現，會導致不同的決策",
      "畫框的好壞會影響對畫作的評價",
      "問題的難度決定了答案的品質",
      "人們只關注事物的表面"
    ],
    answer: 0,
    explanation: "框架效應指同一個問題的不同表述方式會影響人的判斷。例如「存活率90%」比「死亡率10%」讓人更願意接受手術。"
  },
  // 50 - D
  {
    q: "「責任分散效應」在團隊中會產生什麼問題？",
    options: [
      "每個人都搶著承擔責任",
      "團隊成員之間競爭加劇",
      "領導者的壓力增大",
      "每個人都覺得「別人會做」，結果沒人做"
    ],
    answer: 3,
    explanation: "責任分散效應指在群體中，個人的責任感會降低，因為每個人都假設別人會承擔責任，最終導致無人行動。"
  },
  // 51 - B
  {
    q: "「確認偏誤」會讓人怎麼做？",
    options: [
      "客觀地分析所有證據",
      "只注意和尋找支持自己既有觀點的資訊",
      "經常改變自己的觀點",
      "相信大多數人的意見"
    ],
    answer: 1,
    explanation: "確認偏誤指人傾向於搜尋、解讀和記住能支持自己既有信念的資訊，而忽略或否認與之矛盾的證據。"
  },
  // 52 - C
  {
    q: "「登門檻效應」是什麼心理技巧？",
    options: [
      "直接提出大要求更有效",
      "人們不喜歡被一步步引導",
      "先讓人答應小要求，之後更容易答應大要求",
      "站在門口說話比較有說服力"
    ],
    answer: 2,
    explanation: "登門檻效應指先提出一個小的、容易接受的要求，對方答應後，再提出更大的要求時被接受的可能性就會大大提高。"
  },
  // 53 - A
  {
    q: "「延遲滿足」能力強的人通常會怎樣？",
    options: [
      "願意放棄眼前的小利益，以獲得未來更大的回報",
      "立刻享受當下的快樂",
      "不在乎任何回報",
      "讓別人替自己做決定"
    ],
    answer: 0,
    explanation: "延遲滿足是指能抵抗即時誘惑、為了長遠利益而等待的能力。著名的「棉花糖實驗」發現，能延遲滿足的孩子長大後各方面表現更好。"
  },
  // 54 - D
  {
    q: "「投射效應」會導致什麼偏差？",
    options: [
      "以客觀態度評價他人",
      "完全不考慮自己的感受",
      "只關注他人的優點",
      "把自己的想法和感受強加到別人身上"
    ],
    answer: 3,
    explanation: "投射效應指人傾向於假設他人與自己有相同的想法、感受和行為傾向。例如自己喜歡的東西就認為別人也一定喜歡。"
  },
  // 55 - B
  {
    q: "「曝光效應」的核心發現是什麼？",
    options: [
      "越是不熟悉的事物越有吸引力",
      "人們會因為反覆接觸某事物而增加對它的好感",
      "光線越亮的環境越讓人開心",
      "公開曝光的資訊更可信"
    ],
    answer: 1,
    explanation: "曝光效應又稱純粹接觸效應，指人們對越熟悉的事物會產生越多的好感。這也是廣告重複播放的心理學原理。"
  },
  // 56 - C
  {
    q: "「門面效應」（留面子效應）是什麼策略？",
    options: [
      "總是答應別人的要求以維護面子",
      "裝飾店面可以吸引更多顧客",
      "先提出一個過大的要求被拒絕後，再提出真正的較小要求",
      "有面子的人說話更有分量"
    ],
    answer: 2,
    explanation: "門面效應與登門檻效應相反：先提出一個大要求（預期被拒），然後再提出真正想要的小要求，對方因為拒絕了大要求而產生愧疚，更容易答應小要求。"
  },
  // 57 - A
  {
    q: "「齊加尼克效應」對工作效率有什麼啟示？",
    options: [
      "適時中斷工作反而能保持對任務的關注和動力",
      "一口氣完成所有工作效率最高",
      "工作時間越長產出越多",
      "工作中不應該有任何休息"
    ],
    answer: 0,
    explanation: "齊加尼克效應指未完成的任務會在心中持續產生張力，促使人想要完成它。適度的中斷可以利用這種心理張力來維持動力。"
  },
  // 58 - D
  {
    q: "「社會促進效應」是指什麼？",
    options: [
      "社交越多越疲憊",
      "人在獨處時表現最好",
      "社會壓力總是會降低表現",
      "有他人在場時，人做簡單熟悉的事會表現更好"
    ],
    answer: 3,
    explanation: "社會促進效應指在他人面前，人做熟練的任務時表現會更好。但對於不熟練的任務，有人觀看反而會降低表現。"
  },
  // 59 - B
  {
    q: "「過度理由效應」為什麼會降低內在動機？",
    options: [
      "因為人喜歡挑戰高難度任務",
      "因為外在獎勵取代了原本的興趣，一旦獎勵消失就不想做了",
      "因為人天生就是懶惰的",
      "因為理由太多讓人無法做出選擇"
    ],
    answer: 1,
    explanation: "過度理由效應指當原本出於興趣做的事被附加了外在獎勵後，人們會把行為歸因於獎勵而非興趣，一旦獎勵消失，做事的動力也隨之消失。"
  },
  // 60 - C
  {
    q: "「心理帳戶」理論揭示了人的什麼非理性行為？",
    options: [
      "人們總是精確計算每一筆開支",
      "把錢存在銀行是最理性的做法",
      "人會把錢分成不同的「帳戶」，對不同來源的錢有不同的消費態度",
      "收入越高的人越節儉"
    ],
    answer: 2,
    explanation: "心理帳戶指人會在心中把錢分類管理：工作賺的錢精打細算，但中獎的錢卻容易大手大腳花掉，即使金額相同，來源不同就對待不同。"
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
