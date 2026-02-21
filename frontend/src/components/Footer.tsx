export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-white/10 py-8 mt-20 relative z-30">
            <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">

                <p className="text-gray-500 text-sm font-medium">
                    © {new Date().getFullYear()} <span className="text-slate-300">Srinidhi N</span>. All rights reserved.
                </p>

                <div className="flex gap-8 text-sm">
                    <a
                        href="https://github.com/srinidhi9353"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://linkedin.com/in/srinidhi-n-a185652a3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                        LinkedIn
                    </a>

                    <a
                        href="mailto:ssrinidhi622@gmail.com"
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                    >
                        Email
                    </a>
                </div>
            </div>
        </footer>
    )
}
