import type { LucideIcon } from 'lucide-react'
import {
  Activity, AtSign, Atom, BadgeDollarSign, BarChart3, Bell, Binary, BookOpen,
  Boxes, BrainCircuit, Braces, Briefcase, Brush, Bug, Building2, CalendarDays,
  Camera, CircleHelp, ClipboardCheck, Clock3, Cloud, Code2, Coffee,
  Compass, Cpu, CreditCard, Crown, Database, Dna, Dumbbell, FileText, Filter, Flag,
  FlaskConical, FolderKanban, Gauge, Gem, GitBranch, Globe2, GraduationCap, Hammer, Heart,
  Home, Image, KeyRound, Landmark, Languages, Leaf, Library, Lightbulb, LineChart, ListTodo,
  LockKeyhole, Mail, MapPin, MessageCircle, MessagesSquare, Mic2, Microscope, Milestone, Moon,
  Music2, Package, Palette, PenTool, Phone, PieChart, Plane, Podcast, Radio, Receipt, Rocket,
  Scale, ScanLine, Search, Send, Server, Settings2, Share2, ShieldCheck, ShoppingBag, Sigma,
  SlidersHorizontal, Sparkles, SquareTerminal, Star, Store, Sun, Table2, Target, Timer,
  TrendingUp, Truck, Users, Utensils, Video, WalletCards, Workflow, Wrench, Zap,
} from 'lucide-react'

export const ICON_CATEGORIES = ['工作', '数据', '开发', '创作', '沟通', '商务', '生活', '工具', '知识', '标识'] as const

export type IconCategory = typeof ICON_CATEGORIES[number]

export type ProjectIconPreset = {
  id: string
  label: string
  category: IconCategory
  keywords: string
  component: LucideIcon
}

const icon = (
  id: string,
  label: string,
  category: IconCategory,
  keywords: string,
  component: LucideIcon,
): ProjectIconPreset => ({ id, label, category, keywords: `${label} ${category} ${keywords}`.toLowerCase(), component })

export const PROJECT_ICONS: ProjectIconPreset[] = [
  icon('briefcase', '公文包', '工作', '工作 项目 office work', Briefcase),
  icon('kanban', '看板', '工作', '任务 管理 kanban board', FolderKanban),
  icon('todo', '待办', '工作', '清单 任务 todo checklist', ListTodo),
  icon('calendar', '日历', '工作', '日期 计划 calendar schedule', CalendarDays),
  icon('clipboard', '检查', '工作', '审核 完成 clipboard check', ClipboardCheck),
  icon('target', '目标', '工作', '目标 绩效 target goal', Target),
  icon('milestone', '里程碑', '工作', '节点 路线 milestone roadmap', Milestone),
  icon('workflow', '流程', '工作', '自动化 流程 workflow automation', Workflow),
  icon('users', '团队', '工作', '成员 人员 users team', Users),
  icon('building', '组织', '工作', '公司 部门 building organization', Building2),

  icon('bar-chart', '柱状图', '数据', '报表 指标 chart analytics', BarChart3),
  icon('line-chart', '趋势图', '数据', '趋势 曲线 line chart', LineChart),
  icon('pie-chart', '饼图', '数据', '占比 分布 pie chart', PieChart),
  icon('database', '数据库', '数据', '存储 sql database', Database),
  icon('table', '数据表', '数据', '表格 spreadsheet table', Table2),
  icon('gauge', '仪表盘', '数据', '监控 dashboard gauge', Gauge),
  icon('activity', '活动', '数据', '监测 波形 activity monitor', Activity),
  icon('trending', '增长', '数据', '上升 业绩 trending growth', TrendingUp),
  icon('binary', '二进制', '数据', '数字 编码 binary', Binary),
  icon('sigma', '统计', '数据', '数学 汇总 sigma statistics', Sigma),

  icon('code', '代码', '开发', '编程 source code', Code2),
  icon('terminal', '终端', '开发', '命令行 shell terminal', SquareTerminal),
  icon('git-branch', '分支', '开发', '版本 git branch', GitBranch),
  icon('braces', '接口', '开发', 'json api braces', Braces),
  icon('bug', '缺陷', '开发', '问题 调试 bug debug', Bug),
  icon('cpu', '计算', '开发', '芯片 处理器 cpu compute', Cpu),
  icon('server', '服务器', '开发', '后端 主机 server backend', Server),
  icon('cloud', '云服务', '开发', '云端 cloud service', Cloud),
  icon('globe', '网站', '开发', '网页 网络 globe web', Globe2),
  icon('boxes', '模块', '开发', '组件 package module', Boxes),

  icon('palette', '调色板', '创作', '设计 颜色 palette design', Palette),
  icon('pen-tool', '钢笔', '创作', '矢量 绘图 pen vector', PenTool),
  icon('brush', '画笔', '创作', '绘画 美术 brush art', Brush),
  icon('image', '图片', '创作', '照片 图像 image photo', Image),
  icon('camera', '相机', '创作', '摄影 拍摄 camera photo', Camera),
  icon('video', '视频', '创作', '影片 剪辑 video film', Video),
  icon('music', '音乐', '创作', '音频 歌曲 music audio', Music2),
  icon('microphone', '录音', '创作', '语音 麦克风 microphone voice', Mic2),
  icon('sparkles', '灵感', '创作', 'ai 创意 sparkle idea', Sparkles),
  icon('lightbulb', '创意', '创作', '想法 灯泡 lightbulb idea', Lightbulb),

  icon('mail', '邮件', '沟通', '邮箱 email mail', Mail),
  icon('message', '消息', '沟通', '聊天 message chat', MessageCircle),
  icon('messages', '讨论', '沟通', '对话 群聊 messages discussion', MessagesSquare),
  icon('phone', '电话', '沟通', '联系 呼叫 phone call', Phone),
  icon('send', '发送', '沟通', '投递 send paper plane', Send),
  icon('bell', '通知', '沟通', '提醒 bell notification', Bell),
  icon('at-sign', '账号', '沟通', '提及 用户 at account', AtSign),
  icon('share', '分享', '沟通', '协作 share collaboration', Share2),
  icon('radio', '广播', '沟通', '信号 radio broadcast', Radio),
  icon('podcast', '播客', '沟通', '节目 podcast audio', Podcast),

  icon('shopping-bag', '商品', '商务', '购物 产品 shopping product', ShoppingBag),
  icon('store', '商店', '商务', '门店 电商 store shop', Store),
  icon('credit-card', '支付', '商务', '信用卡 payment card', CreditCard),
  icon('wallet', '钱包', '商务', '财务 账户 wallet finance', WalletCards),
  icon('receipt', '订单', '商务', '小票 账单 receipt order', Receipt),
  icon('dollar', '营收', '商务', '金额 收入 dollar revenue', BadgeDollarSign),
  icon('landmark', '金融', '商务', '银行 机构 finance bank', Landmark),
  icon('scale', '法务', '商务', '法律 合规 scale legal', Scale),
  icon('package', '包裹', '商务', '库存 物流 package inventory', Package),
  icon('truck', '运输', '商务', '配送 物流 truck delivery', Truck),

  icon('home', '家庭', '生活', '住宅 home house', Home),
  icon('heart', '健康', '生活', '喜欢 关爱 heart health', Heart),
  icon('coffee', '咖啡', '生活', '休息 饮品 coffee break', Coffee),
  icon('utensils', '餐饮', '生活', '食物 餐厅 food restaurant', Utensils),
  icon('dumbbell', '运动', '生活', '健身 exercise fitness', Dumbbell),
  icon('plane', '旅行', '生活', '航班 出行 plane travel', Plane),
  icon('map-pin', '地点', '生活', '位置 地图 location map', MapPin),
  icon('sun', '天气', '生活', '白天 晴天 sun weather', Sun),
  icon('moon', '夜间', '生活', '深色 睡眠 moon night', Moon),
  icon('leaf', '自然', '生活', '环保 植物 leaf nature', Leaf),

  icon('settings', '设置', '工具', '配置 settings preferences', Settings2),
  icon('wrench', '维护', '工具', '修理 wrench maintenance', Wrench),
  icon('hammer', '构建', '工具', '制作 build hammer', Hammer),
  icon('key', '密钥', '工具', '权限 key access', KeyRound),
  icon('lock', '安全', '工具', '隐私 锁 lock security', LockKeyhole),
  icon('shield', '保护', '工具', '验证 防护 shield secure', ShieldCheck),
  icon('search', '搜索', '工具', '查找 search find', Search),
  icon('filter', '筛选', '工具', '过滤 filter sort', Filter),
  icon('sliders', '调节', '工具', '控制 参数 sliders controls', SlidersHorizontal),
  icon('scan', '扫描', '工具', '识别 scan capture', ScanLine),

  icon('flask', '实验', '知识', '化学 研究 flask science', FlaskConical),
  icon('microscope', '显微镜', '知识', '科研 microscope research', Microscope),
  icon('dna', '生命科学', '知识', '基因 生物 dna biology', Dna),
  icon('atom', '物理', '知识', '原子 科学 atom physics', Atom),
  icon('brain', '智能', '知识', '大脑 ai brain intelligence', BrainCircuit),
  icon('book', '书籍', '知识', '阅读 文档 book reading', BookOpen),
  icon('graduation', '教育', '知识', '学习 学位 graduation education', GraduationCap),
  icon('library', '知识库', '知识', '资料 library knowledge', Library),
  icon('file-text', '文档', '知识', '文章 文件 document text', FileText),
  icon('languages', '语言', '知识', '翻译 多语言 languages translation', Languages),

  icon('rocket', '火箭', '标识', '启动 探索 rocket launch', Rocket),
  icon('zap', '闪电', '标识', '快速 能量 zap lightning', Zap),
  icon('star', '星标', '标识', '收藏 重点 star favorite', Star),
  icon('gem', '宝石', '标识', '精品 珍贵 gem premium', Gem),
  icon('crown', '皇冠', '标识', '高级 领先 crown', Crown),
  icon('flag', '旗帜', '标识', '标记 目标 flag marker', Flag),
  icon('compass', '指南针', '标识', '导航 方向 compass navigation', Compass),
  icon('clock', '时钟', '标识', '时间 计划 clock time', Clock3),
  icon('timer', '计时器', '标识', '倒计时 timer stopwatch', Timer),
  icon('help', '帮助', '标识', '问题 支持 help question', CircleHelp),
]

export function PresetProjectIcon({ id, size }: { id: string; size: number }) {
  const preset = PROJECT_ICONS.find(item => item.id === id)
  if (preset === undefined) return <Sparkles size={size} strokeWidth={1.8} />
  const Component = preset.component
  return <Component size={size} strokeWidth={1.8} />
}
