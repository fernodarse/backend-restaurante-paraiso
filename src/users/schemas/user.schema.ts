import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EncryptionService } from 'src/encryption/encryption.service';

@Schema()
export class User extends Document{
   
    @Prop({ type: String, })
    name: string;

    @Prop({ type: String })
    email: string;   

    @Prop({ type: String })
    photoURL: string;

    @Prop({ type: Boolean, default: true })
    isActive: boolean;

    @Prop({ type: String })
    rol: string;

    @Prop({ type: String,unique: true,index: true, })
    userName: string;

    @Prop({ type: String })
    password: string;

    @Prop({ type: String })
    redId: string;

    checkPassword:Function;
}
export const UserSchema = SchemaFactory.createForClass(User);

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
 UserSchema.pre('save', function(next){

    let user = this;

    // Make sure not to rehash the password if it is already hashed
    if(!user.isModified('password')) return next();

    // Generate a salt and use it to hash the user's password
    bcrypt.genSalt(10, (err, salt) => {

        if(err) return next(err);

        //user.schema.obj.password
        console.log('salt',salt);
        bcrypt.hash(user.get('password'), salt, (err, hash) => {

            if(err) return next(err);
            user.set('password',hash);
            console.log('user salt',user);
            next();

        });

    });

}); 

UserSchema.methods.checkPassword = async function(attempt, callback){

    let user = this;
    console.log('compare pas ',attempt, user.get('password'));
    bcrypt.compare(attempt, user.get('password'), (err, isMatch) => {
        if(err) return callback(err);
        callback(null, isMatch);
    });

};