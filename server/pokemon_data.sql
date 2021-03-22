
-----------------------------CREATE DATABASE-----------------------------
CREATE DATABASE pokemon
 WITH 
    OWNER = postgres
    ENCODING = 'UTF8';

-----------------------------CREATE TABLES-----------------------------
CREATE TABLE public.creatures
(
    poki_id integer NOT NULL,
    name character varying(30) NOT NULL,
    height integer,
    url text ,
    poki_img text,
    PRIMARY KEY (poki_id)
);

CREATE TABLE public.ability
(
    ability_id integer NOT NULL,
    ability_name character varying(30) NOT NULL,
    amount_poki integer,
    total_height integer,
    PRIMARY KEY (ability_id)
);

CREATE TABLE public.poki_able
(
    id integer NOT NULL,
    poki_id integer NOT NULL,
    ability_id integer NOT NULL,
    PRIMARY KEY (id)
);
-----------------------------CONSTRAINT-----------------------------

ALTER TABLE public.creatures
    ADD CONSTRAINT creatures_poki_id_key UNIQUE (poki_id);
ALTER TABLE public.ability
    ADD CONSTRAINT ability_poki_id_key UNIQUE (ability_id);


-----------------------------foreign key-----------------------------
ALTER TABLE public.poki_able
    ADD FOREIGN KEY (poki_id)
    REFERENCES public.creatures (poki_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION;

ALTER TABLE public.poki_able
    ADD FOREIGN KEY (ability_id)
    REFERENCES public.ability (ability_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE NO ACTION;


-----------------------------IMPORT TABLES-----------------------------
COPY public.ability(ability_id,ability_name)
    FROM 'YOUR PATH TO CSV\ability.csv' delimiter ',' csv header;
COPY public.creatures(poki_id,name,height,url,poki_img)
    FROM 'YOUR PATH TO CSV\poki.csv' delimiter ',' csv header;
COPY public.poki_able(id,poki_id,ability_id)
    FROM 'YOUR PATH TO CSV\poki_able.csv' delimiter ',' csv header;
------------------------C:\Users\Demmi\Desktop\pokimon\data_crawling\ability.csv-------------------------
-----------------------------EXTRA:if you want to add 2 more columns to ability seperately-----------------------------
ALTER TABLE public.ability
ADD COLUMN amount_poki integer,
ADD COLUMN total_height integer;


-------------UPDATE img ROUTE------------------
----------UPDATE public.creatures----------
----------SET poki_img = REPLACE(creatures.poki_img, 'C:\Users\Demmi\Desktop\pokimon','')-------------


