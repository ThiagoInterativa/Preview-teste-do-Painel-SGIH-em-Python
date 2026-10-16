# Painel SGIH para Streamlit

Versão independente do módulo Python original enviado. O painel consulta o
PABX, o Kanban e o WhatsFlux usando as credenciais configuradas no Streamlit.

## Executar localmente

1. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

2. Copie `.streamlit/secrets.toml.example` para
   `.streamlit/secrets.toml` e preencha suas credenciais.
3. Inicie o app:

   ```bash
   streamlit run app.py
   ```

Sem credenciais, o painel abre e mostra avisos de configuração; ele não tenta
fazer login com valores vazios.

## Publicar no Streamlit Community Cloud

1. Coloque o conteúdo desta pasta em um repositório GitHub.
2. No Streamlit Community Cloud, crie um app apontando para `app.py`.
3. Nas configurações do app, abra **Secrets** e adicione as seis chaves abaixo.
   Não publique os valores no repositório.

```toml
EMAIL = "seu-email-do-pabx"
SENHA = "sua-senha-do-pabx"

KANBAN_USER = "seu-usuario-do-kanban"
KANBAN_PASS = "sua-senha-do-kanban"

WHATSFLUX_EMAIL = "seu-email-do-whatsflux"
WHATSFLUX_SENHA = "sua-senha-do-whatsflux"
```

O Streamlit instala as bibliotecas listadas em `requirements.txt`.

## Observações

- O painel atualiza os dados a cada 30 segundos, como no módulo original.
- `tarefas_pendentes.json` mantém uma cópia local das tarefas sincronizadas.
  Em hospedagens com sistema de arquivos temporário, essa cópia pode ser
  reiniciada; o Kanban continua sendo a fonte principal.
- O preview dentro do Replit pode mostrar avisos enquanto as credenciais reais
  não estiverem configuradas.
