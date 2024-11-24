-- Primeiro, remova a trigger existente (se houver)
DROP TRIGGER IF EXISTS alternar_status;

-- Defina o delimitador para a trigger
DELIMITER $$

-- Criação da trigger
CREATE TRIGGER alternar_status
BEFORE UPDATE ON jogos
FOR EACH ROW
BEGIN
    -- Se a linha está sendo definida como 'ativo'
    IF NEW.jo_status = 1 THEN
        -- Atualiza as outras linhas para 'inativo'
        UPDATE jogos
        SET jo_status = 2
        WHERE ID_jogos != NEW.ID_jogos AND jo_status = 1;
    END IF;
END$$

-- Restaura o delimitador para o padrão
DELIMITER ;
