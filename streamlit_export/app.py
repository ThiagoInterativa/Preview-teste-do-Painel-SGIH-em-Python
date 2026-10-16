"""Ponto de entrada independente para o Streamlit."""

import sys
from pathlib import Path

import streamlit as st


APP_DIR = Path(__file__).resolve().parent
if str(APP_DIR) not in sys.path:
    sys.path.insert(0, str(APP_DIR))

from dashboard import render  # noqa: E402


def main():
    st.set_page_config(
        page_title="Visão Geral | SGIH",
        page_icon="📞",
        layout="wide",
    )
    render(refresh_rate=30)


if __name__ == "__main__":
    main()
