package dancingbeast.app.entities;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


public class UserDto {
    @NotNull
    @Size(min = 1, message = "{Size.userDto.firstName}")
    private String login;


    private String password;

    @NotNull
    @Size(min = 1)
    private String matchingPassword;


    private Integer role;

   

    public String getLogin() {
        return login;
    }

    public void setLogin(final String login) {
        this.login = login;
    }



    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public String getMatchingPassword() {
        return matchingPassword;
    }

    public void setMatchingPassword(final String matchingPassword) {
        this.matchingPassword = matchingPassword;
    }



    @Override
    public String toString() {
        final StringBuilder builder = new StringBuilder();
        builder.append("UserDto [login=").append(login).append(", password=").append(password).append(", matchingPassword=").append(matchingPassword).append("]");
        return builder.toString();
    }

}