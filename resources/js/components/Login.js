export default function Login() {
    return(
        <div id="loginform">
          <h2 id="headerTitle">Iniciar Sesión</h2>
          <div>
            <FormInput description="Username" placeholder="Correo Electrónico" type="text" />
            <FormInput description="Password" placeholder="Contraseña" type="password"/>
            <FormButton title="Log in"/>
        </div>
          <OtherMethods />
        </div>
    );
}

const Form = props => (
   <div>
     <FormInput description="Username" placeholder="Correo Electrónico" type="text" />
     <FormInput description="Password" placeholder="Contraseña" type="password"/>
     <FormButton title="Log in"/>
   </div>
);

const FormButton = props => (
  <div id="button" class="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
  </div>  
);

const OtherMethods = props => (
  <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      <Facebook />
      <Twitter />
      <Google />
    </div>
  </div>
);

const Facebook = props => (
  <a href="#" id="facebookIcon"></a>
);

const Twitter = props => (
  <a href="#" id="twitterIcon"></a>
);

const Google = props => (
  <a href="#" id="googleIcon"></a>
);
