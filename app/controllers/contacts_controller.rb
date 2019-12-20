class ContactsController < ApplicationController 
  
  # GET request to contact-us
  # create new contact form
  def new
    @contact = Contact.new
  end
  
  # POST request to /contacts
  def create
    # Mass assignment of form field into Contact object
    @contact = Contact.new(contact_params)
    # Save the contect object
    # Plug to database
    if @contact.save
      # Store form field via parameters into variables
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
      # Plug variables into ContactMailer email method and send email
      ContactMailer.contact_email(name, email, body).deliver
      # Store success messege in flash hash
      # Redirect to new action
      flash[:success] = "Messege sent."
      redirect_to new_contact_path
    else
      # If contact object doesn't save -
      # Store errors in flash hash
      # Redirect to new action
      flash[:danger] = @contact.errors.full_messages.join(", ")
      redirect_to new_contact_path
    end
  end
  private
    # To collect data from form, white-list form fields
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end
      
end
