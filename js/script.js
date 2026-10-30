// Component Details Dictionary for Inspector
        const componentDetails = {
            internet: {
                title: "Internet / Clientes",
                icon: "fa-globe",
                color: "text-cyan-400",
                badge: "Tráfego Externo",
                function: "Origem de todo o tráfego legítimo dos clientes solicitando serviços de pagamento da PayLivre.",
                incidentFix: "Anteriormente, o tráfego de clientes se conectava diretamente a recursos sem filtragem de borda nem validação prévia de identidade."
            },
            waf: {
                title: "Proteção Anti-DDoS + WAF",
                icon: "fa-shield-virus",
                color: "text-cyan-400",
                badge: "Camada de Borda",
                function: "Inspeciona tráfego HTTP/HTTPS na camada 7, bloqueando SQL Injection, Cross-Site Scripting (XSS) e mitiga ataques de negação de serviço volumétricos (DDoS).",
                incidentFix: "Resolve diretamente a vulnerabilidade a ataques DDoS que derrubavam a aplicação PayLivre."
            },
            alb: {
                title: "Balanceador de Carga (HTTPS/TLS)",
                icon: "fa-sitemap",
                color: "text-cyan-400",
                badge: "Sub-rede Pública",
                function: "Recebe o tráfego filtrado do WAF, realiza a terminação TLS/HTTPS segura e distribui as requisições entre as instâncias da sub-rede privada.",
                incidentFix: "Elimina a exposição de instâncias individuais com IPs públicos diretos."
            },
            app: {
                title: "Servidores da Aplicação PayLivre",
                icon: "fa-cubes",
                color: "text-emerald-400",
                badge: "Sub-rede Privada de Aplicação",
                function: "Executa os microserviços de pagamento em contêineres sem IP público. Comunica-se exclusivamente com o Balanceador e com o Banco de Dados.",
                incidentFix: "Substitui configurações manuais em instâncias expostas por ambiente privado sem acesso direto da internet."
            },
            db: {
                title: "Banco de Dados de Pagamentos",
                icon: "fa-database",
                color: "text-emerald-400",
                badge: "Sub-rede Privada de Dados",
                function: "Armazena dados transacionais e financeiros críticos. Protegido com criptografia AES-256 em repouso e isolado em sub-rede sem rota direta para a internet.",
                incidentFix: "Corrige a exposição direta do banco de dados na internet e a ausência de criptografia que ocasionaram o vazamento."
            },
            backup: {
                title: "Backup & Recuperação (DR)",
                icon: "fa-box-archive",
                color: "text-cyan-400",
                badge: "Continuidade Operacional",
                function: "Snapshots automatizados, encriptados com KMS e replicados, garantindo RPO e RTO reduzidos para o banco de dados.",
                incidentFix: "Garante recuperação rápida e resiliência contra perda de dados ou sequestro por ransomware."
            },
            iam: {
                title: "Pilar 1: IAM + MFA",
                icon: "fa-id-card-clip",
                color: "text-cyan-400",
                badge: "Controle de Acesso",
                function: "Autenticação multifator mandatória, política de Menor Privilégio e controle de acesso baseado em papéis (RBAC).",
                incidentFix: "Mapeado especificamente para impedir que credenciais vazadas permitam o comprometimento de sistemas."
            },
            vpc: {
                title: "Pilar 2: VPC + Segmentação",
                icon: "fa-network-wired",
                color: "text-emerald-400",
                badge: "Isolamento de Rede",
                function: "Segregação estrita em 3 sub-redes (Pública, Aplicação e Dados) controlada por regras rígidas de Security Groups e NACLs.",
                incidentFix: "Impede o movimento lateral de invasores caso uma camada seja comprometida."
            },
            kms: {
                title: "Pilar 4: TLS + KMS",
                icon: "fa-key",
                color: "text-emerald-400",
                badge: "Criptografia Geral",
                function: "Gerenciamento centralizado de chaves criptográficas para encriptar dados sensíveis em trânsito e em repouso.",
                incidentFix: "Garante conformidade e sigilo total dos dados de pagamento armazenados."
            },
            siem: {
                title: "Pilar 5: SIEM + Logs Centralizados",
                icon: "fa-chart-line",
                color: "text-purple-400",
                badge: "Monitoramento & Auditoria",
                function: "Coleta e correlaciona logs de todos os componentes da infraestrutura em tempo real, gerando alertas e acionando respostas automáticas.",
                incidentFix: "Resolve a falta total de visibilidade e registros de auditoria sobre atividades suspeitas."
            },
            devsecops: {
                title: "Pilar 6: IaC + DevSecOps",
                icon: "fa-code-merge",
                color: "text-cyan-400",
                badge: "Automação Segura",
                function: "Infraestrutura como Código (Terraform) verificada em pipelines CI/CD com análises estáticas (SAST) e scanning de segredos antes do deploy.",
                incidentFix: "Elimina erros de configuração manual e credenciais 'hardcoded' nos fontes."
            }
        };

        // Helper to append logs to terminal
        function logToTerminal(message, type = 'info') {
            const terminal = document.getElementById('terminal-output');
            const entry = document.createElement('div');
            const timestamp = new Date().toLocaleTimeString();

            if (type === 'success') {
                entry.className = 'text-emerald-400';
                entry.innerHTML = `[${timestamp}] [SUCESSO] ${message}`;
            } else if (type === 'danger') {
                entry.className = 'text-red-400 font-bold';
                entry.innerHTML = `[${timestamp}] [ALERTA DE SEGURANÇA] ${message}`;
            } else if (type === 'warning') {
                entry.className = 'text-amber-400';
                entry.innerHTML = `[${timestamp}] [AVISO] ${message}`;
            } else if (type === 'purple') {
                entry.className = 'text-purple-400';
                entry.innerHTML = `[${timestamp}] [SIEM LOG] ${message}`;
            } else {
                entry.className = 'text-slate-300';
                entry.innerHTML = `[${timestamp}] [INFO] ${message}`;
            }

            terminal.appendChild(entry);
            terminal.scrollTop = terminal.scrollHeight;
        }

        function clearLogs() {
            const terminal = document.getElementById('terminal-output');
            terminal.innerHTML = '<div class="text-slate-500">[SYSTEM] Terminal de logs reiniciado.</div>';
        }

        // Modal Inspector Functions
        function inspectComponent(key) {
            const data = componentDetails[key];
            if (!data) return;

            const modal = document.getElementById('inspector-modal');
            const content = document.getElementById('modal-content');

            content.innerHTML = `
                <div class="flex items-center gap-3 mb-4">
                    <div class="p-3 rounded-xl bg-slate-900 border border-slate-700">
                        <i class="fa-solid ${data.icon} ${data.color} text-2xl"></i>
                    </div>
                    <div>
                        <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-700 text-slate-300">${data.badge}</span>
                        <h3 class="text-lg font-bold text-white mt-0.5">${data.title}</h3>
                    </div>
                </div>

                <div class="space-y-4 text-xs">
                    <div class="bg-navy-900/90 p-3 rounded-xl border border-slate-800">
                        <h4 class="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                            <i class="fa-solid fa-gear text-cyan-400"></i> Função Arquitetural
                        </h4>
                        <p class="text-slate-400 leading-relaxed">${data.function}</p>
                    </div>

                    <div class="bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/30">
                        <h4 class="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                            <i class="fa-solid fa-shield-cat"></i> Problema do Incidente Que Resolve
                        </h4>
                        <p class="text-slate-300 leading-relaxed">${data.incidentFix}</p>
                    </div>
                </div>

                <div class="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                    <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-cyan-500 text-navy-900 font-bold text-xs hover:bg-cyan-400 transition-all">
                        Entendido
                    </button>
                </div>
            `;

            modal.classList.remove('hidden');
            logToTerminal(`Inspeção do componente: ${data.title}`);
        }

        function closeModal() {
            document.getElementById('inspector-modal').classList.add('hidden');
        }

        // CANVAS PACKET ANIMATION LOGIC
        let canvas, ctx;
        let activeParticles = [];
        let animationFrameId = null;

        function initCanvas() {
            canvas = document.getElementById('flowCanvas');
            const container = canvas.parentElement;
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            ctx = canvas.getContext('2d');
        }

        window.addEventListener('resize', () => {
            if (canvas) initCanvas();
        });

        // Get Center Positions of DOM Nodes for Particle Path Animation
        function getNodeCenter(elementId) {
            const el = document.getElementById(elementId);
            const canvasEl = document.getElementById('flowCanvas');
            if (!el || !canvasEl) return { x: 0, y: 0 };

            const rect = el.getBoundingClientRect();
            const canvasRect = canvasEl.getBoundingClientRect();

            return {
                x: rect.left + rect.width / 2 - canvasRect.left,
                y: rect.top + rect.height / 2 - canvasRect.top
            };
        }

        // Particle Class
        class PacketParticle {
            constructor(startX, startY, targetX, targetY, color = '#38bdf8', speed = 3, onComplete = null) {
                this.x = startX;
                this.y = startY;
                this.startX = startX;
                this.startY = startY;
                this.targetX = targetX;
                this.targetY = targetY;
                this.color = color;
                this.speed = speed;
                this.progress = 0;
                this.onComplete = onComplete;
                this.radius = 5;
            }

            update() {
                this.progress += this.speed / 100;
                if (this.progress >= 1) {
                    this.progress = 1;
                    if (this.onComplete) this.onComplete();
                    return false; // Finished
                }
                this.x = this.startX + (this.targetX - this.startX) * this.progress;
                this.y = this.startY + (this.targetY - this.startY) * this.progress;
                return true;
            }

            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        
        function renderCanvas() {
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

           // Separa as partículas atuais das que serão criadas
           // pelos callbacks durante este quadro.
           const currentParticles = activeParticles;
           activeParticles = [];

           for (const particle of currentParticles) {
               const alive = particle.update();

               if (alive) {
                   particle.draw(ctx);
                   activeParticles.push(particle);
             }
         }

         animationFrameId = requestAnimationFrame(renderCanvas);
   }


   
/* PayLivre v2 - Partícula seguindo conexão SVG */

class SVGPacketParticle {
    constructor(fromId, toId, color = '#10b981', speed = 2, onComplete = null) {
        this.color = color;
        this.speed = speed;
        this.onComplete = onComplete;
        this.progress = 0;
        this.radius = 5;

        const svg = document.getElementById('architectureConnections');

        this.path = svg?.querySelector(
            `path[data-from="${fromId}"][data-to="${toId}"]`
        );

        this.length = this.path ? this.path.getTotalLength() : 0;
        this.x = 0;
        this.y = 0;
    }

    update() {
        if (!this.path || !this.length) {
            if (this.onComplete) this.onComplete();
            return false;
        }

        this.progress = Math.min(1, this.progress + this.speed / 100);

        const point = this.path.getPointAtLength(
            this.length * this.progress
        );

        const svg = this.path.ownerSVGElement;
        const canvas = document.getElementById('flowCanvas');
        const svgRect = svg.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        this.x = point.x + svgRect.left - canvasRect.left;
        this.y = point.y + svgRect.top - canvasRect.top;

        if (this.progress >= 1) {
            if (this.onComplete) this.onComplete();
            return false;
        }

        return true;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}


        // SIMULATIONS
        function runSimulation(type) {
            initCanvas();
            if (!animationFrameId) renderCanvas();

            if (type === 'legitimate') {
    logToTerminal(
        'Iniciando Simulação: Requisição de Pagamento Legítima...',
        'info'
    );

    const route = [
        ['node-internet', 'node-waf',
            'WAF: Tráfego legítimo verificado.', 'success'],

        ['node-waf', 'node-alb',
            'ALB: Requisição encaminhada à aplicação.', 'info'],

        ['node-alb', 'node-app',
            'App PayLivre: Processando transação.', 'info'],

        ['node-app', 'node-db',
            'BD: Consulta autorizada concluída.', 'success']
    ];

    function animateStep(index) {
        if (index >= route.length) {
            logToTerminal(
                'Fluxo legítimo concluído com sucesso.',
                'success'
            );
            return;
        }

        const [from, to, message, level] = route[index];

        activeParticles.push(
            new SVGPacketParticle(
                from,
                to,
                '#10b981',
                2,
                () => {
                    logToTerminal(message, level);
                    animateStep(index + 1);
                }
            )
        );
    }

    animateStep(0);
}


            else if (type === 'ddos') {
                logToTerminal('ALERTA: Simulação de Ataque Volumétrico DDoS iniciada!', 'danger');
                const p1 = getNodeCenter('node-internet');
                const p2 = getNodeCenter('node-waf');
                const wafBadge = document.getElementById('waf-badge');

                wafBadge.className = 'mt-2 text-[10px] bg-red-900/80 px-2 py-0.5 rounded text-red-300 border border-red-500/50 code-font animate-pulse';
                wafBadge.innerText = 'Status: Mitigando DDoS';

                let count = 0;
                const interval = setInterval(() => {
                    count++;
                    const offsetX = (Math.random() - 0.5) * 40;
                    const offsetY = (Math.random() - 0.5) * 40;

                    activeParticles.push(new PacketParticle(
                        p1.x + offsetX, p1.y + offsetY,
                        p2.x, p2.y,
                        '#ef4444', 4,
                        () => {
                            logToTerminal(`Anti-DDoS Borda: Pacote SYN-Flood ${count * 100} descartado pelo Rate Limiter.`, 'danger');
                        }
                    ));

                    if (count >= 12) {
                        clearInterval(interval);
                        setTimeout(() => {
                            wafBadge.className = 'mt-2 text-[10px] bg-slate-900/80 px-2 py-0.5 rounded text-cyan-400 border border-cyan-500/20 code-font';
                            wafBadge.innerText = 'Status: Normal';
                            logToTerminal('Ataque DDoS totalmente mitigado na camada de borda! VPC mantida intacta.', 'success');
                        }, 2000);
                    }
                }, 150);
            }

            else if (type === 'phishing') {
                logToTerminal('Simulação: Invasor tentando utilizar credencial administrativa vazada...', 'warning');

                setTimeout(() => {
                    logToTerminal('IAM Service: Login com usuário admin tentado de IP não reconhecido.', 'warning');
                    setTimeout(() => {
                        logToTerminal('IAM + MFA: Solicitado token de segundo fator (MFA) obrigatório.', 'purple');
                        setTimeout(() => {
                            logToTerminal('IAM + MFA: Falha na validação do MFA. Acesso NEGADO pelo RBAC.', 'danger');
                            logToTerminal('Política de Menor Privilégio impediu o comprometimento do ambiente.', 'success');
                        }, 1200);
                    }, 1000);
                }, 800);
            }

            else if (type === 'siem') {
                logToTerminal('Iniciando varredura e correlação no SIEM...', 'purple');

                const events = [
                    "SIEM: Auditando chamadas de API do sistema PayLivre.",
                    "SIEM Log: Tentativa de varredura de portas detectada na Sub-rede Pública.",
                    "SIEM Correlation Engine: Evento associado a regras de bloqueio do WAF.",
                    "SIEM Alert: Notificação enviada para equipe SOC via Webhook com hash do evento.",
                    "SIEM Compliance: Registro armazenado em bucket imutável com retenção estendida."
                ];

                events.forEach((evt, idx) => {
                    setTimeout(() => {
                        logToTerminal(evt, 'purple');
                    }, (idx + 1) * 900);
                });
            }

            else if (type === 'devsecops') {
                logToTerminal('Executando pipeline CI/CD DevSecOps (Verificação de IaC Terraform)...', 'info');

                setTimeout(() => {
                    logToTerminal('DevSecOps [SAST]: Analisando manifesto main.tf...', 'info');
                    setTimeout(() => {
                        logToTerminal('DevSecOps [Checkov]: ERRO! Porta 5432 (PostgreSQL) aberta diretamente para 0.0.0.0/0 na linha 42.', 'danger');
                        setTimeout(() => {
                            logToTerminal('DevSecOps [Pipeline]: BUILD FALHOU! Bloqueando implantação de infraestrutura insegura.', 'danger');
                            logToTerminal('DevSecOps: Ação corretiva exigida antes de permitir merge no repositório.', 'success');
                        }, 1000);
                    }, 1000);
                }, 800);
            }
        }

        function resetArchitecture() {
            activeParticles = [];
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
            clearLogs();
            logToTerminal('Visualização e estado da arquitetura restaurados.', 'info');
        }

        // Initialize canvas on load
        window.onload = function() {
            initCanvas();
        };

    // PayLivre v2 - Seleção visual dos componentes

document.querySelectorAll(".arch-node").forEach((node) => {
    node.addEventListener("click", () => {
        document.querySelectorAll(".arch-node").forEach((item) => {
            item.classList.remove("node-selected");
        });

        node.classList.add("node-selected");
    });
});


/* PayLivre v2 - Conexões SVG responsivas */

(function () {
    const svg = document.getElementById("architectureConnections");
    if (!svg) return;

    const pairs = [
        ["node-internet", "node-waf"],
        ["node-waf", "node-alb"],
        ["node-alb", "node-app"],
        ["node-app", "node-db"]
    ];

    const NS = "http://www.w3.org/2000/svg";

    function drawConnections() {
        const container = svg.parentElement;
        const bounds = container.getBoundingClientRect();
        const width = bounds.width;
        const height = bounds.height;

        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.replaceChildren();

        const defs = document.createElementNS(NS, "defs");
        const marker = document.createElementNS(NS, "marker");

        marker.setAttribute("id", "paylivre-arrow");
        marker.setAttribute("markerWidth", "7");
        marker.setAttribute("markerHeight", "7");
        marker.setAttribute("refX", "6");
        marker.setAttribute("refY", "3");
        marker.setAttribute("orient", "auto");
        marker.setAttribute("markerUnits", "userSpaceOnUse");

        const tip = document.createElementNS(NS, "path");
        tip.setAttribute("d", "M0 0 L6 3 L0 6 Z");
        tip.setAttribute("fill", "#34d399");
        tip.setAttribute("stroke", "none");

        marker.appendChild(tip);
        defs.appendChild(marker);
        svg.appendChild(defs);

        pairs.forEach(([fromId, toId]) => {
            const from = document.getElementById(fromId);
            const to = document.getElementById(toId);

            if (!from || !to) return;

            const a = from.getBoundingClientRect();
            const b = to.getBoundingClientRect();

            const horizontal =
                b.left >= a.right + 8 &&
                Math.abs(
                    (a.top + a.height / 2) -
                    (b.top + b.height / 2)
                ) < Math.max(a.height, b.height);

            let x1, y1, x2, y2, pathData;

            if (horizontal) {
                x1 = a.right - bounds.left + 3;
                y1 = a.top + a.height / 2 - bounds.top;
                x2 = b.left - bounds.left - 5;
                y2 = b.top + b.height / 2 - bounds.top;

                const midX = (x1 + x2) / 2;

                pathData =
                    `M ${x1} ${y1} ` +
                    `H ${midX} V ${y2} H ${x2}`;
            } else if (b.top >= a.bottom + 8) {
                x1 = a.left + a.width / 2 - bounds.left;
                y1 = a.bottom - bounds.top + 3;
                x2 = b.left + b.width / 2 - bounds.left;
                y2 = b.top - bounds.top - 5;

                const midY = (y1 + y2) / 2;

                pathData =
                    `M ${x1} ${y1} ` +
                    `V ${midY} H ${x2} V ${y2}`;
            } else {
                // Sem espaço seguro: evita atravessar os cards.
                return;
            }

            const path = document.createElementNS(NS, "path");
            path.setAttribute("d", pathData);
            path.setAttribute("marker-end", "url(#paylivre-arrow)");
            path.setAttribute("data-from", fromId);
            path.setAttribute("data-to", toId);

            svg.appendChild(path);
        });
    }

    window.addEventListener("load", drawConnections);
    window.addEventListener("resize", drawConnections);

    if ("ResizeObserver" in window) {
        const observer = new ResizeObserver(drawConnections);
        observer.observe(svg.parentElement);
    }

    drawConnections();
})();
