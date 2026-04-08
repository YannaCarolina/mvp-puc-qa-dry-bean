# MVP - Qualidade de Software

Este projeto foi desenvolvido como parte do MVP da disciplina de Qualidade de Software, integrando conceitos de machine learning, desenvolvimento full stack, testes automatizados e boas práticas de software seguro.

O objetivo do projeto é classificar variedades de feijão com base em características físicas do grão, utilizando o **Dry Bean Dataset**. A solução contempla o treinamento do modelo em notebook, a disponibilização da predição em uma aplicação full stack e a validação automatizada do desempenho do modelo com PyTest.

## Estrutura do repositório

```text
mvp-puc-qa-dry-bean/
├── backend/
│   ├── app.py
│   ├── best_dry_bean_model.joblib
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── notebook/
│   └── mvp_puc_qa_dry_bean.ipynb
├── tests/
│   └── test_model_performance.py
└── README.md
Notebook de machine learning
O notebook com o processo completo de construção e avaliação do modelo está disponível em:

notebook/mvp_puc_qa_dry_bean.ipynb

Nele são contempladas as etapas de:

carga do dataset por URL;
análise inicial dos dados;
separação entre treino e teste;
normalização e padronização;
treinamento dos algoritmos KNN, Árvore de Classificação, Naive Bayes e SVM;
otimização de hiperparâmetros;
avaliação e comparação dos modelos;
exportação do melhor modelo;
conclusão e reflexão sobre boas práticas de software seguro.
Tecnologias utilizadas
Python
Scikit-Learn
FastAPI
HTML
CSS
JavaScript
PyTest
Como executar o backend
Na raiz do projeto, instale as dependências com:

python3 -m pip install -r backend/requirements.txt
Depois, execute a API com:

uvicorn backend.app:app --reload --port 8001
A API ficará disponível em:

http://127.0.0.1:8001
http://127.0.0.1:8001/docs
Como executar o frontend
Com o backend em execução, abra o arquivo abaixo no navegador:

frontend/index.html

Preencha os campos com as características do grão e clique em Prever variedade para visualizar a classe prevista pelo modelo.

Como executar o teste automatizado
Na raiz do projeto, execute:

pytest tests/test_model_performance.py
O teste valida se o modelo atende ao threshold mínimo de desempenho definido para o projeto.

Dataset utilizado
Dry Bean Dataset
Fonte: UCI Machine Learning Repository
Observações finais
O modelo final utilizado pela aplicação foi exportado a partir do notebook de machine learning e integrado ao backend para permitir a realização de predições por meio da interface web.

Além da implementação técnica, o projeto também considera aspectos de qualidade e segurança, como validação de entrada, controle de dependências e teste automatizado de desempenho do modelo.
