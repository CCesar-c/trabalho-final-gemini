CREATE TABLE IF NOT EXISTS estudantes (
	id_estudante serial primary key,
	nome varchar(100) not null,
	email varchar(100) not null unique,
	data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trilhas (
	trilha_id serial primary key,
	nome_trilha varchar(50) not null,
	id_estudante int references estudantes(id_estudante),
	temas_ia JSONB DEFAULT '[]'::jsonb,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS progresso (
	progresso_id serial primary key,
	id_estudante int references estudantes(id_estudante),
	notas int not null,
	feedback_ia TEXT not null,
	estado_aprovacao varchar(10) not null,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);