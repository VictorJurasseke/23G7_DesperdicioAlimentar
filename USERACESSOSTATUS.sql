DELIMITER $$

CREATE TRIGGER AtualizarTipoAcessoUsuarios
AFTER UPDATE ON jogos
FOR EACH ROW
BEGIN
    -- Verifica se o jo_status foi alterado para inativo (2)
    IF NEW.jo_status = 2 THEN
        UPDATE usuarios
        SET user_tipo_acesso = 2
        WHERE ID_usuarios IN (
            SELECT ID_usuarios
            FROM jogos_matricula
            WHERE ID_jogos = NEW.id_jogos
        );
    -- Verifica se o jo_status foi alterado para ativo (1)
    ELSEIF NEW.jo_status = 1 THEN
        UPDATE usuarios
        SET user_tipo_acesso = 3
        WHERE ID_usuarios IN (
            SELECT ID_usuarios
            FROM jogos_matricula
            WHERE ID_jogos = NEW.id_jogos
        );
    END IF;
END$$

DELIMITER ;
