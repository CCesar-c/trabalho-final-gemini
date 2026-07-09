-- create table estudantes(
-- 	id_estudante serial primary key,
-- 	nome varchar(20) not null,
-- 	email varchar(50) not null,
-- 	data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- create table trilhas(
-- 	trilha_id serial primary key,
-- 	nome_trilha varchar(50) not null,
-- 	id_estudante int references estudantes(id_estudante),
-- 	temas_ia JSONB DEFAULT '[]'::jsonb, 
--     creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- create table progresso(
-- 	progresso_id serial primary key,
-- 	id_estudante int references estudantes(id_estudante),
-- 	notas int not null,
-- 	feedback_ia Text not null,
-- 	estado_aprovacao varchar(10) not null,
--     creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );


ALTER TABLE progresso ALTER COLUMN feedback_ia TYPE TEXT;

