# Nova Fortaleza Digital | PayLivre

Laboratório educacional e interativo de **Cloud Security e DevSecOps**, baseado em um cenário **fictício** de uma startup de pagamentos.

> **Aviso:** esta aplicação é uma simulação no navegador. Não provisiona recursos de nuvem, não inspeciona tráfego real, não executa ataques e não coleta logs de um SIEM real.

## Demonstração

[Acessar o laboratorio interativo PayLivre v2.0](https://alexsabrasil.github.io/paylivre-cloud-security-lab/)

## Funcionalidades

- Diagrama interativo com VPC, sub-rede pública, sub-rede privada de aplicação e sub-rede privada de dados.
- Inspeção de componentes e relação com os problemas do incidente fictício.
- Simulação visual de requisição legítima, mitigação de DDoS, phishing/MFA, eventos SIEM e verificação IaC/DevSecOps.
- Console com **eventos simulados** e explicação de responsabilidade compartilhada.

## Seis pilares

| Pilar | Controle | Objetivo |
|---|---|---|
| 1 | IAM + MFA | Identidades individuais e menor privilégio |
| 2 | VPC + segmentação | Isolar aplicação e dados da internet |
| 3 | Anti-DDoS + WAF | Mitigar tráfego malicioso e padrões de ataques web |
| 4 | TLS + KMS | Proteger dados em trânsito e repouso |
| 5 | SIEM + logs | Detectar, correlacionar e investigar eventos |
| 6 | IaC + DevSecOps | Revisar configurações e impedir implantações inseguras |

## Tecnologias

HTML5, CSS3, JavaScript e Canvas 2D; Tailwind CSS via CDN; Font Awesome via CDN; Google Fonts. A página requer conexão com a internet para carregar esses recursos externos.

## Execução local

Abra `index.html` em um navegador moderno, com acesso à internet. Opcionalmente, inicie um servidor estático:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Publicação no GitHub Pages

No repositório, acesse **Settings → Pages → Build and deployment**, escolha **Deploy from a branch**, selecione `main` e `/ (root)`, e salve.

## Estrutura

```text
index.html
css/style.css
js/script.js
docs/
README.md
LICENSE
.gitignore
```

## Limitações e boas práticas

- O WAF e as proteções DDoS reduzem riscos, mas não garantem bloqueio de todos os ataques.
- MFA reduz riscos de credenciais vazadas; RBAC limita permissões de contas autenticadas.
- Criptografia de disco não impede leitura por usuários de banco com acesso legítimo.
- As sub-redes exigem regras de rede e de identidade corretamente configuradas.
- A divisão de responsabilidades com o provedor varia conforme IaaS/PaaS/SaaS.
- O exemplo de IaC é apenas um log fictício; este repositório não inclui infraestrutura Terraform implantável.

## Créditos

Protótipo inicial gerado com auxílio do Gemini e revisado/organizado para fins educacionais. PayLivre é uma empresa fictícia neste laboratório.

## Validacao funcional

Os cinco cenarios principais foram testados localmente em 30/10/2026.

| Cenario | Comportamento observado | Resultado |
|---|---|---|
| Requisicao legitima | Particula verde percorre as conexoes SVG entre os componentes | Aprovado |
| Ataque DDoS | Particulas vermelhas chegam ao WAF, com mitigacao simulada | Aprovado |
| Phishing / Credenciais | Tentativa de login, exigencia de MFA e acesso negado | Aprovado |
| SIEM | Auditoria, deteccao, correlacao, alerta ao SOC e retencao | Aprovado |
| DevSecOps / IaC | Deteccao simulada de PostgreSQL exposto e bloqueio do pipeline | Aprovado |

Os testes validam o comportamento demonstrativo da interface.
Nao representam uma auditoria de seguranca real.

### Melhorias implementadas

- Separacao do codigo em HTML, CSS e JavaScript.
- Conexoes SVG responsivas entre componentes.
- Animacao de particulas seguindo as conexoes SVG.
- Correcao da execucao duplicada da simulacao legitima.
- Remocao da seta animada redundante.
- Inspecao interativa dos componentes.

### Evidencias

As capturas de tela dos testes podem ser armazenadas em
`docs/evidencias/`, sem informacoes pessoais ou sensiveis.
