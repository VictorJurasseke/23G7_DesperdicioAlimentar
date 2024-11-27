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

DELIMITER //

DELIMITER $$

CREATE TRIGGER atualiza_ranks_jogo
AFTER UPDATE ON inventario_matricula
FOR EACH ROW
BEGIN
    -- Passo 1: Reorganizar os ranks para o jogo específico
    SET @rank := 0;

    -- Passo 2: Atualiza o rank dos usuários no jogo com base na pontuação
    UPDATE jogos_matricula
    SET rank_usuario = (@rank := @rank + 1)
    WHERE ID_jogos = NEW.ID_jogos
    ORDER BY pontos_usuario DESC;  -- Ordena pela pontuação, do maior para o menor

END$$

DELIMITER ;






