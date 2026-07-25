import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1. Listen for Auth State Changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch Data from Supabase Table
  useEffect(() => {
    if (session) {
      fetchTodos();
    }
  }, [session]);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.error("Error fetching todos:", error.message);
    else setTodos(data || []);
  };

  // 3. Insert New Item
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: newTodo, user_id: session.user.id }])
      .select();

    if (error) {
      alert(error.message);
    } else {
      setTodos([data[0], ...todos]);
      setNewTodo("");
    }
  };

  // 4. Handle Auth Sign In / Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Check your email for confirmation link!");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setTodos([]);
  };

  if (loading) return <div className="p-8 text-center">Loading Supabase session...</div>;

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-slate-900 text-white rounded-xl shadow-2xl font-sans">
      {!session ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-emerald-400">Welcome to Supabase Auth</h2>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 bg-slate-800 rounded border border-slate-700 text-white"
            />
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 bg-slate-800 rounded border border-slate-700 text-white"
            />
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSignIn}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 rounded font-semibold transition"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded font-semibold transition"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <p className="text-xs text-slate-400">Logged in as:</p>
              <p className="text-sm font-medium text-emerald-300">{session.user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-3 py-1 text-xs bg-red-900/50 hover:bg-red-800 text-red-200 rounded border border-red-700"
            >
              Sign Out
            </button>
          </div>

          <form onSubmit={addTodo} className="flex gap-2">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-1 p-2 bg-slate-800 rounded border border-slate-700 text-sm text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-sm font-semibold"
            >
              Add
            </button>
          </form>

          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="p-3 bg-slate-800/60 rounded border border-slate-700/50 flex justify-between items-center text-sm"
              >
                <span>{todo.title}</span>
              </li>
            ))}
            {todos.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-4">
                No tasks found in Supabase table yet.
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
