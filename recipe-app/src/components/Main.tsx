import { FC, useState } from "react"
import { RecipeCard } from "./RecipeCard";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Recipe {
  id: number,
  image: string,
  name: string,
  desc: string
}
const recipes = [
  {
    id: 1,
    image: "https://img.freepik.com/free-photo/aloo-paratha-gobi-paratha-also-known-as-potato-cauliflower-stuffed-flatbread-dish-originating-from-indian-subcontinent_466689-76186.jpg?size=626&ext=jpg",
    name: 'Aalu Paratha',
    desc: 'Aalu paratha is very good.'
  },
  {
    id: 2,
    image: "https://thumbs.dreamstime.com/b/bhel-puri-23902772.jpg",
    name: 'Bhel',
    desc: 'Bhelpuri is a savoury snack originating from India, and is also a type of chaat. It is made of puffed rice, vegetables and a tangy tamarind sauce, and has a crunchy texture.',
  }
];
let nextId = 2;
const Main: FC = () => {

  const [state, setState] = useState<boolean>(false)
  const [recipe, setRecipes] = useState<Recipe[]>(recipes)

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');
  const handleClose = () => setState(false);
  const handleShow = () => setState(true);
  const [edit, setEdit] = useState<Recipe | undefined>();

  const onEditHandler = (recipe: Recipe) => {
    setEdit(recipe)
    const { name, image, desc } = recipe
    setName(name)
    setImage(image)
    setDesc(desc)
    handleShow()
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Recipe
      </Button>
      <Modal show={state} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Recipe Name</label>
            <input className="form-control" id="exampleFormControlInput1" placeholder="Enter recipe name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input type="img_url" className="form-control" id="exampleFormControlInput1" placeholder="Enter iamge url"
              value={image}
              onChange={e => setImage(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Recipe Detail</label>
            <textarea name="desc" value={desc} className="form-control" id="exampleFormControlTextarea1" rows={3}
              onChange={e => setDesc(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            setRecipes([
              ...recipe,
              {
                id: nextId++,
                name: name,
                image: image,
                desc: desc
              }
            ]);
            handleClose()
          }
          }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {recipe.map(recipe => <>
          <RecipeCard key={recipe.id} recipe={recipe} onEditHandler={onEditHandler}></RecipeCard>
        </>)}
      </div>
    </>
  )
}
export default Main