import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pptxgen = require('C:/Users/czy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pptxgenjs/dist/pptxgen.cjs.js');

const pptx = new pptxgen();
pptx.defineLayout({ name: 'A3_LANDSCAPE', width: 16.535, height: 11.693 });
pptx.layout = 'A3_LANDSCAPE';
pptx.author = 'Codex';
pptx.subject = '热带海岛建筑环境与智能建造';
pptx.title = '热带海岛建筑环境与智能建造：个人科研实践框架';
pptx.company = 'Editable reconstruction';
pptx.lang = 'zh-CN';
pptx.theme = {
  headFontFace: 'Microsoft YaHei',
  bodyFontFace: 'Microsoft YaHei',
  lang: 'zh-CN'
};
pptx.layout = 'A3_LANDSCAPE';

const slide = pptx.addSlide();
slide.background = { color: 'FFFFFF' };

const W = 16.535, H = 11.693;
const ink = '1F1F1F';
const gray = 'B6B6B6';
const soft = 'F7F7F7';
const pink = 'F39AAA';
const palePink = 'FFF3F5';
const font = 'Microsoft YaHei';
const shape = pptx.ShapeType;

function text(str, x, y, w, h, opts = {}) {
  slide.addText(str, {
    x, y, w, h, margin: 0,
    fontFace: font, fontSize: 7.2, color: ink,
    breakLine: false, fit: 'shrink', valign: 'mid',
    ...opts
  });
}
function rect(x, y, w, h, opts = {}) {
  slide.addShape(shape.rect, {
    x, y, w, h,
    fill: { color: 'FFFFFF', transparency: 100 },
    line: { color: gray, width: 0.65 },
    ...opts
  });
}
function round(x, y, w, h, opts = {}) {
  slide.addShape(shape.roundRect, {
    x, y, w, h,
    rectRadius: 0.04,
    fill: { color: 'FFFFFF', transparency: 100 },
    line: { color: gray, width: 0.65 },
    ...opts
  });
}
function ln(x1, y1, x2, y2, opts = {}) {
  slide.addShape(shape.line, {
    x: x1, y: y1, w: x2 - x1, h: y2 - y1,
    line: { color: gray, width: 0.65, ...opts }
  });
}
function arrow(x1, y1, x2, y2, opts = {}) {
  slide.addShape(shape.line, {
    x: x1, y: y1, w: x2 - x1, h: y2 - y1,
    line: { color: '4B4B4B', width: 0.75, endArrowType: 'triangle', ...opts }
  });
}
function sectionTitle(label, x, y, w) {
  ln(x, y + 0.12, x + 1.16, y + 0.12, { color: pink, width: 0.85 });
  ln(x + w - 1.16, y + 0.12, x + w, y + 0.12, { color: pink, width: 0.85 });
  text(label, x + 1.2, y, w - 2.4, 0.22, { fontSize: 8.3, bold: true, align: 'center' });
}
function panel(x, y, w, h, titleZh, titleEn) {
  round(x, y, w, h, { line: { color: '929292', width: 0.78 }, fill: { color: 'FFFFFF', transparency: 100 } });
  text(titleZh, x + 0.12, y + 0.13, w - 0.24, 0.25, { fontSize: 10.7, bold: true, align: 'center' });
  text(titleEn, x + 0.12, y + 0.40, w - 0.24, 0.17, { fontSize: 5.75, color: '333333', align: 'center' });
  ln(x + 0.10, y + 0.66, x + w - 0.10, y + 0.66, { color: pink, width: 0.75 });
}
function smallBox(label, x, y, w, h, opts = {}) {
  round(x, y, w, h, { fill: { color: soft }, line: { color: '848484', width: 0.55 }, ...opts });
  text(label, x + 0.04, y + 0.02, w - 0.08, h - 0.04, { fontSize: 6.75, align: 'center', ...opts.text });
}
function pinkBox(label, x, y, w, h, fs = 7.2) {
  round(x, y, w, h, { fill: { color: palePink }, line: { color: pink, width: 0.7 } });
  text(label, x + 0.07, y + 0.03, w - 0.14, h - 0.06, { fontSize: fs, bold: true, align: 'center' });
}
function dottedBox(x, y, w, h) {
  round(x, y, w, h, { line: { color: '8D8D8D', width: 0.6, dash: 'dash' }, fill: { color: 'FFFFFF', transparency: 100 } });
}
function cardIcon(icon, caption, x, y, w, h) {
  round(x, y, w, h, { fill: { color: 'FFFFFF' }, line: { color: gray, width: 0.6 } });
  text(icon, x, y + 0.12, w, 0.3, { fontFace: 'Segoe UI Symbol', fontSize: 17, align: 'center' });
  text(caption, x + 0.06, y + h - 0.35, w - 0.12, 0.28, { fontSize: 6.4, align: 'center' });
}
function verticalIssue(icon, label, x, y, w, h) {
  round(x, y, w, h, { fill: { color: 'FFFFFF' }, line: { color: 'A3A3A3', width: 0.55 } });
  text(icon, x, y + 0.1, w, 0.22, { fontFace: 'Segoe UI Symbol', fontSize: 14, align: 'center' });
  text(label, x + 0.14, y + 0.43, w - 0.28, h - 0.54, { fontSize: 7.0, bold: true, breakLine: true, fit: 'shrink', align: 'center', valign: 'mid', vert: 'vert270' });
}

// Header
text('热带海岛建筑环境与智能建造', 3.55, 0.12, 9.45, 0.47, { fontSize: 23, bold: true, align: 'center' });
text('个人科研实践框架  /  Personal Research Practice Framework', 3.2, 0.66, 10.15, 0.22, { fontSize: 10.4, align: 'center' });
text('聚焦热带海岛建筑的可持续性与韧性提升，从低碳材料、建筑知识建模到灾后智能决策，形成“材料—信息—管理—实践”的递进式科研路径。', 2.25, 1.00, 12.05, 0.18, { fontSize: 6.35, align: 'center' });
pinkBox('个人科研实践', 7.16, 1.33, 2.22, 0.34, 10.3);

// Main panels
const py = 1.76, ph = 7.48, pw = 3.84;
const xs = [0.18, 4.27, 8.36, 12.45];
panel(xs[0], py, pw, ph, '研究背景与问题定位', 'Background & Research Focus');
panel(xs[1], py, pw, ph, '材料层：绿色材料与建筑性能', 'Materials Layer');
panel(xs[2], py, pw, ph, '信息层：建筑知识建模与智能检索', 'Information Layer');
panel(xs[3], py, pw, ph, '管理层：灾后恢复与多智能体决策', 'Management Layer');

// Panel 1: background and focus
sectionTitle('现实问题', xs[0] + 0.10, 2.48, pw - 0.20);
const issueX = xs[0] + 0.16, issueY = 2.91, issueW = 0.62, issueH = 1.36, issueGap = 0.13;
[['♨', '高温\n高湿'], ['◔', '台风\n频发'], ['♧', '资源\n约束'], ['▥', '能耗\n偏高'], ['⌘', '信息\n分散']].forEach((item, i) => verticalIssue(item[0], item[1], issueX + i * (issueW + issueGap), issueY, issueW, issueH));
// issue braces/connector
ln(issueX + 0.25, 2.77, issueX + 0.25, 2.86); ln(issueX + 0.25, 2.77, issueX + 3.45, 2.77); 
for (let i = 0; i < 5; i++) { ln(issueX + i * (issueW + issueGap) + issueW / 2, 2.77, issueX + i * (issueW + issueGap) + issueW / 2, 2.87); }
ln(issueX + 0.25, 4.39, issueX + 0.25, 4.49, { dash: 'dash' }); ln(issueX + 0.25, 4.49, issueX + 3.45, 4.49, { dash: 'dash' });
sectionTitle('核心研究问题', xs[0] + 0.10, 4.58, pw - 0.20);
pinkBox('如何通过材料、信息与智能管理\n提升热带海岛建筑的可持续性与韧性？', xs[0] + 0.29, 4.95, pw - 0.58, 0.56, 7.1);
sectionTitle('研究定位', xs[0] + 0.10, 5.72, pw - 0.20);
smallBox('热带海岛建筑', xs[0] + 1.17, 6.02, 1.50, 0.31);
arrow(xs[0] + 1.92, 6.33, xs[0] + 1.92, 6.51);
['绿色低碳材料', '建筑知识数字化', '灾后智能管理'].forEach((s, i) => smallBox(s, xs[0] + 0.12 + i * 1.2, 6.58, 1.08, 0.31));
ln(xs[0] + 0.63, 6.51, xs[0] + 3.20, 6.51); [0.63, 1.92, 3.20].forEach(v => ln(xs[0] + v, 6.51, xs[0] + v, 6.57));
ln(xs[0] + 0.63, 6.91, xs[0] + 3.20, 6.91); ln(xs[0] + 1.92, 6.91, xs[0] + 1.92, 7.04);
smallBox('可持续与韧性提升', xs[0] + 0.95, 7.05, 2.0, 0.32);
sectionTitle('研究方法导向', xs[0] + 0.10, 7.56, pw - 0.20);
[['≋','建筑环境'], ['♜','实验数据'], ['⌘','知识建模'], ['◉','智能决策']].forEach((it,i) => cardIcon(it[0], it[1], xs[0]+0.19+i*0.89, 7.89, 0.72, 0.74));

// Panel 2: materials
pinkBox('省级大创项目：椰壳废弃物应用于建筑\n围护结构对建筑能耗的影响研究', xs[1] + 0.14, 2.37, pw - 0.28, 0.52, 7.1);
sectionTitle('研究流程', xs[1] + 0.10, 3.05, pw - 0.20);
['椰壳废弃物收集','纤维处理与配比设计','试块制备与养护','力学性能测试','围护结构热工分析','建筑能耗影响评估'].forEach((s,i) => {
  smallBox(s, xs[1]+0.77, 3.30+i*0.38, 2.28, 0.25);
  if (i < 5) arrow(xs[1]+1.91, 3.55+i*0.38, xs[1]+1.91, 3.64+i*0.38);
});
sectionTitle('关键内容', xs[1] + 0.10, 5.61, pw - 0.20);
const kx = [xs[1]+0.16, xs[1]+1.49, xs[1]+2.79];
['材料制备','力学测试','热工/能耗分析'].forEach((s,i) => smallBox(s, kx[i], 5.96, 1.03, 0.28));
['椰壳纤维\n混凝土配合比\n资源化利用','抗压\n抗折\n剪裂','传热性能\n围护结构\n节能效益'].forEach((s,i) => { dottedBox(kx[i]-0.04, 6.37, 1.11, 0.93); text(s, kx[i]+0.05,6.49,0.93,0.65,{fontSize:6.4,align:'center',breakLine:true}); });
sectionTitle('阶段成果', xs[1] + 0.10, 7.55, pw - 0.20);
['实验数据','性能认识','绿色材料应用基础'].forEach((s,i)=>{smallBox(s,xs[1]+0.15+i*1.34,7.89,1.06,0.47); if(i<2) arrow(xs[1]+1.22+i*1.34,8.12,xs[1]+1.43+i*1.34,8.12);});
ln(xs[1]+0.10,8.82,xs[1]+pw-0.10,8.82,{color:pink,width:0.75});
text('关键词：建筑物理 / 低碳材料 / 热带建筑', xs[1]+0.15,8.92,pw-0.3,0.16,{fontSize:6.15,align:'center'});

// Panel 3: information
pinkBox('建筑规范可视化检索与校验系统', xs[2] + 0.14, 2.39, pw - 0.28, 0.37, 7.3);
sectionTitle('技术流程', xs[2] + 0.10, 2.96, pw - 0.20);
['规范文本收集','条文切片与结构化','实体—属性—关系提取','知识网络构建','交互式可视化','LLM 辅助检索与校验'].forEach((s,i)=>{smallBox(s,xs[2]+0.93,3.20+i*0.38,1.98,0.25); if(i<5)arrow(xs[2]+1.92,3.45+i*0.38,xs[2]+1.92,3.54+i*0.38);});
sectionTitle('系统组成', xs[2] + 0.10, 5.52, pw - 0.20);
const sys = [
  ['数据层',['规范文本','指标条文','构件信息']],
  ['建模层',['Python处理','NetworkX','Pyvis']],
  ['应用层',['语义检索','规范校验','知识追溯']]
];
sys.forEach((g,i)=>{ const bx=xs[2]+0.13+i*1.20; dottedBox(bx,5.86,1.07,1.61); text(g[0],bx+0.03,6.00,1.01,0.18,{fontSize:7,bold:true,align:'center'}); g[1].forEach((s,j)=>smallBox(s,bx+0.12,6.28+j*0.34,0.83,0.25,{text:{fontSize:5.8}})); });
sectionTitle('信息层作用', xs[2] + 0.10, 7.54, pw - 0.20);
[['▤','材料性能数据'],['⌘','知识结构化'],['◯','可查询/\n可推理'],['▣','支撑设计\n与管理']].forEach((it,i)=>{const bx=xs[2]+0.23+i*0.91; text(it[0],bx,7.89,.45,.28,{fontFace:'Segoe UI Symbol',fontSize:17,align:'center'});text(it[1],bx-0.17,8.27,.80,.34,{fontSize:5.7,align:'center',breakLine:true}); if(i<3)arrow(bx+0.48,8.06,bx+0.74,8.06);});
ln(xs[2]+0.10,8.82,xs[2]+pw-0.10,8.82,{color:pink,width:0.75});
text('关键词：知识图谱 / 可视化 / LLM', xs[2]+0.15,8.92,pw-0.3,0.16,{fontSize:6.15,align:'center'});

// Panel 4: management
pinkBox('台风灾后建筑损伤与恢复多智能体研究', xs[3] + 0.12, 2.40, pw - 0.24, 0.37, 7.15);
sectionTitle('决策流程', xs[3] + 0.10, 2.98, pw - 0.20);
['灾损多源数据输入','损伤信息识别','任务与约束建模','多智能体协同','恢复计划生成'].forEach((s,i)=>{smallBox(s,xs[3]+1.00,3.23+i*0.38,1.80,0.25);if(i<4)arrow(xs[3]+1.90,3.48+i*.38,xs[3]+1.90,3.57+i*.38);});
sectionTitle('多智能体系统', xs[3] + 0.10, 5.28, pw - 0.20);
smallBox('恢复决策系统', xs[3]+1.19,5.56,1.45,0.29);
ln(xs[3]+1.92,5.85,xs[3]+1.92,6.03); ln(xs[3]+0.45,6.03,xs[3]+3.39,6.03);
const agents = [['信息整合\nAgent','修缮优先级'],['约束识别\nAgent','材料推荐'],['任务规划\nAgent','工作计划'],['资源协调\nAgent','资源配置']];
agents.forEach((a,i)=>{const bx=xs[3]+0.10+i*.91;ln(bx+.42,6.03,bx+.42,6.16);pinkBox(a[0],bx,6.18,.80,.44,5.8);arrow(bx+.40,6.63,bx+.40,6.89);smallBox(a[1],bx,6.91,.80,.37,{text:{fontSize:5.8}});});
sectionTitle('管理层价值', xs[3] + 0.10, 7.53, pw - 0.20);
[['▢','知识支持'],['☷','约束识别'],['♧','协同决策'],['⌁','灾后恢复\n效率提升']].forEach((it,i)=>{const bx=xs[3]+.27+i*.87;text(it[0],bx,7.86,.32,.28,{fontFace:'Segoe UI Symbol',fontSize:15,align:'center'});text(it[1],bx-.19,8.25,.7,.31,{fontSize:5.7,align:'center',breakLine:true});if(i<3)arrow(bx+.38,8.06,bx+.67,8.06);});
ln(xs[3]+0.10,8.82,xs[3]+pw-0.10,8.82,{color:pink,width:0.75});
text('关键词：台风灾后 / 多智能体 / 智能建造', xs[3]+0.12,8.92,pw-0.24,0.16,{fontSize:6.0,align:'center'});

// Bottom integrated framework
round(0.18, 9.39, W - 0.36, 2.05, { line: { color: '929292', width: 0.75 }, fill: { color: 'FFFFFF' } });
text('融合应用与能力递进', 5.25, 9.51, 6.0, 0.26, { fontSize: 12.0, bold: true, align: 'center' });
const bottomSteps = [['♜','材料实验'],['▤','数据治理'],['⌘','知识建模'],['◉','智能决策'],['▥','设计应用']];
bottomSteps.forEach((it,i)=>{const bx=.78+i*2.47;slide.addShape(shape.ellipse,{x:bx,y:9.84,w:.61,h:.61,fill:{color:'FFFFFF'},line:{color:'E5B3BE',width:.75}});text(it[0],bx,9.96,.61,.22,{fontFace:'Segoe UI Symbol',fontSize:15,align:'center'});text(it[1],bx-.17,10.59,.95,.19,{fontSize:7.1,bold:true,align:'center'});if(i<4)arrow(bx+.78,10.15,bx+2.18,10.15);});
text('形成面向热带海岛建筑的跨学科科研路径：材料提供物质基础，信息建立知识桥梁，管理支撑智能决策。', .98, 11.06, 9.82, .18,{fontSize:6.9,align:'left'});

// Tools panel
round(11.44, 9.72, 4.77, 1.38, { line: { color: pink, width: 0.8 }, fill: { color: 'FFFFFF' } });
text('关键工具与平台', 12.58, 9.67, 2.55, 0.22, { fontSize: 8.0, bold: true, align: 'center' });
ln(11.55,9.75,12.52,9.75,{color:pink,width:.75}); ln(15.68,9.75,16.10,9.75,{color:pink,width:.75});
['🐍','⌘','⌁','◉','≋','▥','AIGC'].forEach((s,i)=>text(s,11.66+i*.62,10.13,.38,.28,{fontFace: i===0?'Segoe UI Emoji':'Segoe UI Symbol',fontSize:i===6?6.5:17,align:'center'}));
text('Python  /  NetworkX  /  Pyvis  /  LLM  /  建筑物理  /  BIM  /  AIGC', 11.64, 10.72, 4.32, .18,{fontSize:6.3,align:'center'});

// Document metadata footer (tiny but editable)
text('A3 横向 · 全部由可编辑 PowerPoint 对象构成', 0.25, 11.48, 4.1, 0.10, { fontSize: 3.8, color: '999999' });

await pptx.writeFile({ fileName: '热带海岛建筑环境与智能建造_A3横版可编辑.pptx' });
