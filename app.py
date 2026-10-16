"""Preview do painel de monitoramento SGIH em modo de demonstração."""

from datetime import datetime
from zoneinfo import ZoneInfo

import streamlit as st


st.set_page_config(
    page_title="Visão Geral | SGIH",
    page_icon="📊",
    layout="wide",
)

AGENTES = [
    {"nome": "Leonardo", "status": "livre"},
    {"nome": "Matheus", "status": "ocupado"},
    {"nome": "Gabriel", "status": "livre"},
    {"nome": "Ramon", "status": "pausa"},
    {"nome": "Thiago", "status": "livre"},
    {"nome": "Vinicius", "status": "offline"},
]

TAREFAS = [
    {
        "titulo": "Instalação do agente de inventário",
        "detalhe": "Estação FIN-024",
        "status": "Pendente",
    },
    {
        "titulo": "Revisar acesso à pasta compartilhada",
        "detalhe": "Equipe Financeira",
        "status": "Pendente",
    },
    {
        "titulo": "Substituição de headset",
        "detalhe": "Atendimento — estação 03",
        "status": "Pendente",
    },
]

WHATSAPP = [
    {"nome": "Leonardo", "status": "online"},
    {"nome": "Matheus", "status": "online"},
    {"nome": "Gabriel", "status": "offline"},
    {"nome": "Ramon", "status": "online"},
    {"nome": "Thiago", "status": "offline"},
    {"nome": "Vinicius", "status": "online"},
]

ROTULOS_STATUS = {
    "livre": "Livre",
    "ocupado": "Ocupado",
    "pausa": "Em pausa",
    "offline": "Offline",
    "online": "Online",
}

ICONE_STATUS = {
    "livre": "🟢",
    "ocupado": "🔴",
    "pausa": "🟡",
    "offline": "⚪",
    "online": "🟢",
}


with st.sidebar:
    st.title("SGIH")
    st.caption("Service Desk · painel de monitoramento")
    st.divider()
    st.subheader("Atualização")
    intervalo = st.selectbox(
        "Atualizar painel a cada",
        options=[15, 30, 60],
        index=1,
        format_func=lambda segundos: f"{segundos} segundos",
    )
    if st.button("Atualizar agora", use_container_width=True):
        st.rerun()
    st.divider()
    st.info(
        "Este preview usa dados ilustrativos. "
        "Nenhuma conta ou serviço externo está conectado."
    )


@st.fragment(run_every=intervalo)
def painel_monitoramento():
    st.title("Visão Geral")
    st.caption("Monitoramento do ambiente e ferramentas — Service Desk")
    st.caption(
        "Demonstração · Última atualização: "
        f"{datetime.now(ZoneInfo('America/Sao_Paulo')).strftime('%d/%m/%Y às %H:%M:%S')}"
    )

    coluna_pabx, coluna_kanban, coluna_whatsapp = st.columns(
        [1.3, 1.7, 1],
        gap="medium",
    )

    with coluna_pabx:
        with st.container(border=True):
            st.subheader("☎️ Status PABX")
            totais = {
                status: sum(agente["status"] == status for agente in AGENTES)
                for status in ("livre", "ocupado", "pausa", "offline")
            }
            metricas = st.columns(2)
            metricas[0].metric("🟢 Livres", totais["livre"])
            metricas[1].metric("🔴 Ocupados", totais["ocupado"])
            metricas = st.columns(2)
            metricas[0].metric("🟡 Em pausa", totais["pausa"])
            metricas[1].metric("⚪ Offline", totais["offline"])
            st.divider()

            for agente in AGENTES:
                if agente["status"] == "offline":
                    continue
                status = agente["status"]
                st.write(
                    f"{ICONE_STATUS[status]} **{agente['nome']}** "
                    f"— {ROTULOS_STATUS[status]}"
                )

    with coluna_kanban:
        with st.container(border=True):
            st.subheader("🗂️ Tarefas Kanban")
            st.caption(f"{len(TAREFAS)} tarefas pendentes")
            st.divider()
            for tarefa in TAREFAS:
                st.markdown(f"**{tarefa['titulo']}**")
                st.caption(f"{tarefa['detalhe']} · {tarefa['status']}")
                st.divider()

    with coluna_whatsapp:
        with st.container(border=True):
            st.subheader("💬 WhatsApp")
            conectados = sum(
                usuario["status"] == "online" for usuario in WHATSAPP
            )
            st.caption(f"{conectados} de {len(WHATSAPP)} usuários online")
            st.divider()
            for usuario in WHATSAPP:
                status = usuario["status"]
                st.write(
                    f"{ICONE_STATUS[status]} **{usuario['nome']}** "
                    f"— {ROTULOS_STATUS[status]}"
                )


painel_monitoramento()
