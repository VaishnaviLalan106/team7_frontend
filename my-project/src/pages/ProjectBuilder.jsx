import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Hammer, Clock, ChevronRight, CheckCircle2, Circle, Code2, Send, Bot, Loader2, BookOpen, Lightbulb, Rocket } from 'lucide-react';
import { sendChatMessage } from '../services/apiService';

const ProjectBuilder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const project = location.state?.project;

    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [completedSteps, setCompletedSteps] = useState([]);

    useEffect(() => {
        if (!project) {
            navigate('/roadmap');
            return;
        }
        // Generate AI step-by-step guide for the project
        const generateSteps = async () => {
            setLoading(true);
            try {
                const response = await sendChatMessage(`Generate a step-by-step guide to build this project: "${project.title}" - ${project.description}. Give me 6 clear steps.`);
                // Parse AI response into steps, or use demo steps
                setSteps(getDemoSteps(project));
            } catch {
                setSteps(getDemoSteps(project));
            }

            setChatMessages([{
                role: 'ai',
                text: `Welcome to the Project Builder! 🚀\n\nYou're building: **${project.title}**\n\n${project.description}\n\nI'll guide you through each step. Click on any step to start, and ask me anything — I'm here to help you build this from scratch!`
            }]);
            setLoading(false);
        };
        generateSteps();
    }, [project, navigate]);

    const handleSendChat = async () => {
        if (!chatInput.trim()) return;
        const userMsg = chatInput.trim();
        setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setChatInput('');
        setIsTyping(true);

        try {
            const response = await sendChatMessage(`I'm building the project "${project?.title}". Current step: "${steps[currentStep]?.title}". ${userMsg}`);
            setChatMessages(prev => [...prev, { role: 'ai', text: response.reply }]);
        } catch {
            setChatMessages(prev => [...prev, { role: 'ai', text: "I'd suggest breaking this down further. Try implementing the core logic first, then add features one by one. Shall I show you some sample code?" }]);
        }
        setIsTyping(false);
    };

    const toggleStepComplete = (stepIndex) => {
        setCompletedSteps(prev =>
            prev.includes(stepIndex)
                ? prev.filter(s => s !== stepIndex)
                : [...prev, stepIndex]
        );
    };

    const askStepHelp = async (step) => {
        setCurrentStep(step);
        setIsTyping(true);
        setChatMessages(prev => [...prev, {
            role: 'ai',
            text: `Let's work on **Step ${step + 1}: ${steps[step].title}**\n\n${steps[step].explanation}\n\nHere's a hint to get started:\n\`\`\`\n${steps[step].codeHint}\n\`\`\`\n\nTry implementing this, then ask me if you get stuck!`
        }]);
        setIsTyping(false);
    };

    if (!project) return null;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-12 h-12 mx-auto">
                        <Sparkles size={48} className="text-gold" />
                    </motion.div>
                    <p className="text-sm text-text-muted">AI is preparing your project guide...</p>
                </div>
            </div>
        );
    }

    const progress = steps.length > 0 ? Math.round((completedSteps.length / steps.length) * 100) : 0;

    return (
        <div className="max-w-6xl mx-auto pb-12 space-y-6">
            {/* Header */}
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-start gap-4">
                <button onClick={() => navigate('/roadmap')} className="p-2 rounded-xl bg-white/5 border border-white/10 text-text-muted hover:text-white hover:bg-white/10 transition-all shrink-0 mt-1">
                    <ArrowLeft size={18} />
                </button>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <Hammer size={12} className="text-emerald-400" />
                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">AI Project Builder</span>
                        </div>
                        <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded
                            ${project.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : project.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                    : 'bg-gold/10 text-gold border border-gold/20'}`}>
                            {project.difficulty}
                        </span>
                        <span className="text-[10px] text-text-muted flex items-center gap-1"><Clock size={10} /> {project.time}</span>
                    </div>
                    <h1 className="text-2xl font-black text-white">{project.title}</h1>
                    <p className="text-sm text-text-muted mt-1">{project.description}</p>
                </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/10">
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white">{completedSteps.length}/{steps.length} steps completed</span>
                        <span className="text-xs font-bold text-emerald-400">{progress}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
                {progress === 100 && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-lg">
                        <Rocket size={14} className="text-gold" />
                        <span className="text-[10px] font-bold text-gold">+100 XP</span>
                    </motion.div>
                )}
            </div>

            {/* Main content: Steps + Chat side by side */}
            <div className="grid lg:grid-cols-5 gap-6">
                {/* Steps Panel (3 columns) */}
                <div className="lg:col-span-3 space-y-3">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
                        <Lightbulb size={12} className="text-gold" /> Step-by-Step Guide
                    </h3>
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-4 rounded-xl border transition-all cursor-pointer
                                ${currentStep === i
                                    ? 'bg-emerald-500/10 border-emerald-500/30'
                                    : completedSteps.includes(i)
                                        ? 'bg-white/[0.02] border-emerald-500/20 opacity-70'
                                        : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'}`}
                            onClick={() => askStepHelp(i)}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    onClick={(e) => { e.stopPropagation(); toggleStepComplete(i); }}
                                    className="shrink-0 mt-0.5 cursor-pointer"
                                >
                                    {completedSteps.includes(i)
                                        ? <CheckCircle2 size={20} className="text-emerald-400" />
                                        : <Circle size={20} className="text-white/20 hover:text-white/40 transition-colors" />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[9px] font-bold text-text-muted bg-white/5 px-2 py-0.5 rounded">STEP {i + 1}</span>
                                        <h4 className={`text-sm font-bold ${completedSteps.includes(i) ? 'text-emerald-400 line-through' : 'text-white'}`}>
                                            {step.title}
                                        </h4>
                                    </div>
                                    <p className="text-xs text-text-muted leading-relaxed">{step.summary}</p>
                                </div>
                                <ChevronRight size={14} className={`text-text-muted shrink-0 mt-1 ${currentStep === i ? 'text-emerald-400' : ''}`} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* AI Chat Panel (2 columns) */}
                <div className="lg:col-span-2">
                    <div className="sticky top-20 bg-[#0F172A] rounded-2xl border border-white/10 flex flex-col h-[600px]">
                        {/* Chat Header */}
                        <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-4 rounded-t-2xl shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                                    <Bot size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">Nova AI Builder</h3>
                                    <p className="text-[9px] text-white/70 uppercase tracking-wider">Click any step for guidance</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {chatMessages.map((msg, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[90%] p-3 rounded-xl text-xs leading-relaxed
                                        ${msg.role === 'ai'
                                            ? 'bg-white/[0.06] border border-white/10 text-white'
                                            : 'bg-emerald-600 text-white'}`}
                                        style={{ whiteSpace: 'pre-wrap' }}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-1.5 p-3 bg-white/[0.06] rounded-xl w-fit border border-white/10">
                                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }} className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                                    <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }} className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                                </div>
                            )}
                        </div>

                        {/* Chat Input */}
                        <div className="p-3 border-t border-white/10 shrink-0">
                            <div className="relative flex gap-2">
                                <input
                                    type="text" value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                                    placeholder="Ask AI for help..."
                                    className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/10 transition-all"
                                />
                                <button onClick={handleSendChat} className="w-9 h-9 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-500 transition-all shrink-0">
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Demo steps generator based on project type
const getDemoSteps = (project) => {
    const title = project.title.toLowerCase();

    if (title.includes('todo')) {
        return [
            { title: 'Set Up Project', summary: 'Initialize a React + TypeScript project with Vite and install dependencies', explanation: 'Run `npm create vite@latest todo-app -- --template react-ts` and install dependencies.', codeHint: 'npm create vite@latest todo-app -- --template react-ts\ncd todo-app && npm install' },
            { title: 'Define Types', summary: 'Create Todo interface, TodoStatus enum, and Action types', explanation: 'Define the core types: Todo interface with id, text, completed, createdAt. Create an enum for filter states.', codeHint: 'interface Todo {\n  id: string;\n  text: string;\n  completed: boolean;\n  createdAt: Date;\n}\n\nenum FilterStatus {\n  All = "all",\n  Active = "active",\n  Completed = "completed"\n}' },
            { title: 'Build TodoList Component', summary: 'Create the main list component with typed props and state', explanation: 'Build a TodoList component that accepts typed props and manages the list display.', codeHint: 'const TodoList: React.FC<{ todos: Todo[]; onToggle: (id: string) => void }> = ({ todos, onToggle }) => {\n  return (\n    <ul>\n      {todos.map(todo => (\n        <li key={todo.id} onClick={() => onToggle(todo.id)}>\n          {todo.text}\n        </li>\n      ))}\n    </ul>\n  );\n};' },
            { title: 'Add CRUD Operations', summary: 'Implement add, toggle, delete with typed reducer pattern', explanation: 'Use useReducer with typed actions for state management.', codeHint: 'type TodoAction = \n  | { type: "ADD"; payload: string }\n  | { type: "TOGGLE"; payload: string }\n  | { type: "DELETE"; payload: string };\n\nconst todoReducer = (state: Todo[], action: TodoAction): Todo[] => {\n  switch (action.type) {\n    case "ADD": return [...state, { id: crypto.randomUUID(), text: action.payload, completed: false, createdAt: new Date() }];\n    case "TOGGLE": return state.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t);\n    case "DELETE": return state.filter(t => t.id !== action.payload);\n  }\n};' },
            { title: 'Add Filters & localStorage', summary: 'Implement filter buttons and persist state to localStorage', explanation: 'Add All/Active/Completed filters and save todos to localStorage on every change.', codeHint: 'const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);\n\nconst filteredTodos = todos.filter(todo => {\n  if (filter === FilterStatus.Active) return !todo.completed;\n  if (filter === FilterStatus.Completed) return todo.completed;\n  return true;\n});\n\n// Save to localStorage\nuseEffect(() => {\n  localStorage.setItem("todos", JSON.stringify(todos));\n}, [todos]);' },
            { title: 'Style & Deploy', summary: 'Add CSS styling, animations, and deploy to Vercel or Netlify', explanation: 'Polish the UI with nice styles and deploy your finished app.', codeHint: '/* Add smooth transitions */\n.todo-item {\n  transition: all 0.2s ease;\n  border-left: 3px solid transparent;\n}\n.todo-item:hover {\n  border-left-color: #22c55e;\n  background: rgba(255,255,255,0.02);\n}' },
        ];
    }

    if (title.includes('weather')) {
        return [
            { title: 'Setup React + TS Project', summary: 'Create Vite project with React and TypeScript template', explanation: 'Initialize the project and install Zod for runtime validation.', codeHint: 'npm create vite@latest weather-dash -- --template react-ts\ncd weather-dash && npm install zod axios' },
            { title: 'Define Weather Types', summary: 'Create TypeScript interfaces for API responses using Zod schemas', explanation: 'Define schemas that validate the OpenWeather API response structure.', codeHint: 'import { z } from "zod";\n\nconst WeatherSchema = z.object({\n  main: z.object({ temp: z.number(), humidity: z.number() }),\n  weather: z.array(z.object({ main: z.string(), icon: z.string() })),\n  name: z.string(),\n});\n\ntype WeatherData = z.infer<typeof WeatherSchema>;' },
            { title: 'Build API Service', summary: 'Create type-safe API layer with Axios and Zod validation', explanation: 'Fetch weather data and validate it at runtime using Zod.parse().', codeHint: 'const fetchWeather = async (city: string): Promise<WeatherData> => {\n  const res = await axios.get(\n    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`\n  );\n  return WeatherSchema.parse(res.data);\n};' },
            { title: 'Build UI Components', summary: 'Create SearchBar, WeatherCard, and ForecastList with typed props', explanation: 'Build the visual components that display weather information.', codeHint: 'interface WeatherCardProps {\n  data: WeatherData;\n  loading: boolean;\n}\n\nconst WeatherCard: React.FC<WeatherCardProps> = ({ data, loading }) => {\n  if (loading) return <Skeleton />;\n  return (\n    <div className="weather-card">\n      <h2>{data.name}</h2>\n      <p>{Math.round(data.main.temp)}°C</p>\n    </div>\n  );\n};' },
            { title: 'Handle Loading & Errors', summary: 'Add loading states, error boundaries, and skeleton UI', explanation: 'Gracefully handle API failures and show loading skeletons.', codeHint: 'const [state, setState] = useState<{\n  data: WeatherData | null;\n  loading: boolean;\n  error: string | null;\n}>({ data: null, loading: false, error: null });\n\ntry {\n  setState(prev => ({ ...prev, loading: true, error: null }));\n  const data = await fetchWeather(city);\n  setState({ data, loading: false, error: null });\n} catch (err) {\n  setState(prev => ({ ...prev, loading: false, error: "City not found" }));\n}' },
            { title: 'Polish & Add Forecast', summary: 'Style the dashboard, add 5-day forecast, and deploy', explanation: 'Add forecast data, beautiful CSS, and deploy to production.', codeHint: '/* Weather gradient backgrounds based on conditions */\nconst getBackground = (condition: string) => {\n  switch (condition) {\n    case "Clear": return "linear-gradient(135deg, #f6d365, #fda085)";\n    case "Rain": return "linear-gradient(135deg, #667db6, #0082c8)";\n    default: return "linear-gradient(135deg, #89f7fe, #66a6ff)";\n  }\n};' },
        ];
    }

    // Generic project steps
    return [
        { title: 'Project Setup', summary: `Initialize the project structure and install required dependencies`, explanation: `Create the project folder, initialize with the right tools, and install core dependencies.`, codeHint: 'mkdir my-project && cd my-project\nnpm init -y\nnpm install express cors dotenv' },
        { title: 'Define Data Models', summary: 'Create the core data structures, interfaces, and schemas', explanation: 'Define the types and schemas that will shape your application data.', codeHint: '// Define your core data model\ninterface Project {\n  id: string;\n  title: string;\n  description: string;\n  status: "active" | "completed";\n  createdAt: Date;\n}' },
        { title: 'Build Core Logic', summary: 'Implement the main business logic and algorithms', explanation: 'Write the core functions that drive the application behavior.', codeHint: '// Implement core functionality\nfunction processData(input) {\n  // Your main logic here\n  return transformedResult;\n}' },
        { title: 'Create the Interface', summary: 'Build the user interface or API endpoints', explanation: 'Design and implement the user-facing parts of your application.', codeHint: '// Build your interface\napp.get("/api/data", async (req, res) => {\n  const data = await fetchData();\n  res.json(data);\n});' },
        { title: 'Add Error Handling', summary: 'Implement proper error handling, validation, and edge cases', explanation: 'Ensure your application handles errors gracefully and validates input.', codeHint: 'try {\n  const result = await riskyOperation();\n  return { success: true, data: result };\n} catch (error) {\n  console.error("Operation failed:", error);\n  return { success: false, error: error.message };\n}' },
        { title: 'Test & Deploy', summary: 'Write tests, verify everything works, and deploy to production', explanation: 'Run tests, fix any bugs, and deploy your finished project.', codeHint: '// Simple test\ntest("should return correct result", () => {\n  expect(processData(input)).toEqual(expected);\n});\n\n// Deploy\nnpm run build && npm run deploy' },
    ];
};

export default ProjectBuilder;
