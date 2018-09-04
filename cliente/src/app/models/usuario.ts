export class Usuario{
	constructor(
		public _id: string,
		public nombre: string,
		public apellido: string,
		public alias: string,
		public email: string,
		public contrasenia: string,
		public telefono: string,
		public imagen: string,
    public fechaCreacion: string,
    public fechaModificacion: string,
    public tipoUsuario: string,
    public localidad: string
  ){}
}
