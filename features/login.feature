Feature: Login Feature
    @login
    Scenario: Login to OrangeHRM
        Given I am on the OrangeHRM Login page
        Then  I verified the OrangeHRM Login page
        When I login OrangeHRM with <uname> and <upassword>

        Examples:
            | uname | upassword |
            | Admin | admin123  |
