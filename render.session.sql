delete from classification where classification_name = 'Boats'

select * from classification

delete from account

select * from account

UPDATE account
SET account_type = 'Employee'
WHERE account_email = 'happy@340.edu';

UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'manager@340.edu';

SELECT account_firstname, account_email, account_type FROM account;


SELECT * from inventory

SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = 'manager@340.edu';

SELECT* FROM wishlist 

SELECT * FROM public.inventory AS i 
       JOIN public.classification AS c 
       ON i.classification_id = c.classification_id 
       WHERE c.classification_id = 2

ALTER TABLE public.account 
DROP COLUMN account_password;
