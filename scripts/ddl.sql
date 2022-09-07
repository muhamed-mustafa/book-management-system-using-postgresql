CREATE SCHEMA bms;

-- bms.book definition

-- Drop table

-- DROP TABLE bms.book;

CREATE TABLE bms.book (
	book_id serial NOT NULL,
	book_title varchar(300) NOT NULL,
	book_description varchar(1000) NULL,
	book_author varchar(50) NOT NULL,
	book_publisher varchar(50) NOT NULL,
	book_pages int4 NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT book_pkey PRIMARY KEY (book_id)
);


-- bms.store definition

-- Drop table

-- DROP TABLE bms.store;

CREATE TABLE bms.store (
	store_id serial NOT NULL,
	store_name varchar(100) NOT NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	address varchar(200) NOT NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);

-- app_audit
CREATE TABLE bms.app_audit (
	audit_id serial NOT NULL,
	audit_action varchar(100) NOT NULL,
	audit_data json NULL,
	audit_by varchar(50) NOT NULL,
	audit_on timestamp NOT NULL,
	audit_status varchar(50) NULL,
	audit_error json NULL,
	CONSTRAINT app_audit_pkey PRIMARY KEY (audit_id)
);

CREATE TABLE bms.app_user (
	user_id serial NOT NULL,
	username varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	email varchar(355) NOT NULL,
	full_name varchar(500) NOT NULL,
	active int2 NULL DEFAULT 1,
	created_on timestamp null,
  updated_on timestamp NULL,
	updated_by varchar(100) NULL,
	CONSTRAINT user_email_key UNIQUE (email),
	CONSTRAINT user_pkey PRIMARY KEY (user_id),
	CONSTRAINT user_username_key UNIQUE (username)
);