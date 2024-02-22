import { useCallback, useState } from 'react';
import { Dialog } from '../dialog';
import { Button } from '../button';
import { Title } from '../title';
import { Input } from '../input';
import { Container } from './styles';
import { api } from '../../server/api';

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [color, setColor] = useState('');

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const createCategory = async () => {
    const data = {
      title: categoryName,
      color: color,
    };

    await api.post('/categories', data);
  };

  const onSubmit = useCallback(() => {
    createCategory();

    handleClose();
  }, [handleClose]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Nova categoria</Button>}
    >
      <Container>
        <Title
          title="Nova categoria"
          subtitle="Crie uma nova categoria para suas transações"
        />

        <form>
          <div>
            <Input
              label="Nome"
              placeholder="Nome da categoria..."
              onChange={(e) => setCategoryName(e.target.value)}
              value={categoryName}
            />
            <Input
              label="Cor"
              type="color"
              onChange={(e) => setColor(e.target.value)}
              value={color}
            />
          </div>
          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Cancelar
            </Button>
            <Button onClick={onSubmit} type="button">
              Cadastrar
            </Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  );
}
